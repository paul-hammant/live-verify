/*
    Copyright (C) 2025, Paul Hammant

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as
    published by the Free Software Foundation, either version 3 of the
    License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

package com.liveverify.app

import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.RectF
import android.util.AttributeSet
import android.view.MotionEvent
import android.view.View
import com.google.mlkit.vision.text.Text

/**
 * Custom view that displays bounding boxes around detected text blocks
 * and handles tap events to select a region for OCR.
 */
class TextOverlayView @JvmOverloads constructor(
    context: Context,
    attrs: AttributeSet? = null,
    defStyleAttr: Int = 0
) : View(context, attrs, defStyleAttr) {

    /**
     * Represents a detected text block with its bounds in view coordinates.
     */
    data class TextBlock(
        val bounds: RectF,
        val text: String,
        val originalBounds: RectF // Bounds in image coordinates
    )

    private val textBlocks = mutableListOf<TextBlock>()
    private var selectedBlock: TextBlock? = null

    // Image dimensions for coordinate transformation
    private var imageWidth: Int = 0
    private var imageHeight: Int = 0
    private var rotationDegrees: Int = 0

    private val boxPaint = Paint().apply {
        color = Color.argb(180, 0, 150, 255) // Semi-transparent blue
        style = Paint.Style.STROKE
        strokeWidth = 4f
    }

    private val selectedPaint = Paint().apply {
        color = Color.argb(180, 0, 255, 100) // Semi-transparent green
        style = Paint.Style.STROKE
        strokeWidth = 6f
    }

    private val fillPaint = Paint().apply {
        color = Color.argb(40, 0, 150, 255) // Very transparent blue fill
        style = Paint.Style.FILL
    }

    private val selectedFillPaint = Paint().apply {
        color = Color.argb(60, 0, 255, 100) // Very transparent green fill
        style = Paint.Style.FILL
    }

    var onBlockSelected: ((TextBlock?) -> Unit)? = null

    /**
     * Update the detected text blocks from ML Kit.
     * @param text The Text result from ML Kit
     * @param imageWidth Width of the analyzed image (after rotation)
     * @param imageHeight Height of the analyzed image (after rotation)
     * @param rotationDegrees Rotation applied to get from camera to display orientation
     */
    fun setDetectedText(text: Text, imageWidth: Int, imageHeight: Int, rotationDegrees: Int = 0) {
        this.imageWidth = imageWidth
        this.imageHeight = imageHeight
        this.rotationDegrees = rotationDegrees

        textBlocks.clear()

        for (block in text.textBlocks) {
            block.boundingBox?.let { box ->
                val originalBounds = RectF(
                    box.left.toFloat(),
                    box.top.toFloat(),
                    box.right.toFloat(),
                    box.bottom.toFloat()
                )

                // Transform to view coordinates
                val viewBounds = transformToViewCoordinates(originalBounds)

                textBlocks.add(TextBlock(
                    bounds = viewBounds,
                    text = block.text,
                    originalBounds = originalBounds
                ))
            }
        }

        invalidate()
    }

    /**
     * Clear all detected text blocks.
     */
    fun clearBlocks() {
        textBlocks.clear()
        selectedBlock = null
        invalidate()
    }

    /**
     * Transform image coordinates to view coordinates.
     * Handles the aspect ratio differences between image and view.
     */
    private fun transformToViewCoordinates(imageBounds: RectF): RectF {
        if (imageWidth == 0 || imageHeight == 0 || width == 0 || height == 0) {
            return imageBounds
        }

        // Calculate scale factors
        // CameraX preview uses CENTER_CROP (aspect fill) by default
        val scaleX = width.toFloat() / imageWidth
        val scaleY = height.toFloat() / imageHeight
        val scale = maxOf(scaleX, scaleY) // CENTER_CROP uses max

        // Calculate offset for centering
        val scaledWidth = imageWidth * scale
        val scaledHeight = imageHeight * scale
        val offsetX = (width - scaledWidth) / 2
        val offsetY = (height - scaledHeight) / 2

        return RectF(
            offsetX + imageBounds.left * scale,
            offsetY + imageBounds.top * scale,
            offsetX + imageBounds.right * scale,
            offsetY + imageBounds.bottom * scale
        )
    }

    /**
     * Transform view coordinates back to image coordinates.
     * Used when cropping the captured image.
     */
    fun transformToImageCoordinates(viewBounds: RectF): RectF {
        if (imageWidth == 0 || imageHeight == 0 || width == 0 || height == 0) {
            return viewBounds
        }

        val scaleX = width.toFloat() / imageWidth
        val scaleY = height.toFloat() / imageHeight
        val scale = maxOf(scaleX, scaleY)

        val scaledWidth = imageWidth * scale
        val scaledHeight = imageHeight * scale
        val offsetX = (width - scaledWidth) / 2
        val offsetY = (height - scaledHeight) / 2

        return RectF(
            (viewBounds.left - offsetX) / scale,
            (viewBounds.top - offsetY) / scale,
            (viewBounds.right - offsetX) / scale,
            (viewBounds.bottom - offsetY) / scale
        )
    }

    /**
     * Add padding to bounds for cropping (20% like iOS).
     */
    fun addPadding(bounds: RectF, padding: Float = 0.2f): RectF {
        val padX = bounds.width() * padding
        val padY = bounds.height() * padding
        return RectF(
            (bounds.left - padX).coerceAtLeast(0f),
            (bounds.top - padY).coerceAtLeast(0f),
            (bounds.right + padX).coerceAtMost(imageWidth.toFloat()),
            (bounds.bottom + padY).coerceAtMost(imageHeight.toFloat())
        )
    }

    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)

        for (block in textBlocks) {
            val isSelected = block == selectedBlock

            // Draw fill
            canvas.drawRect(block.bounds, if (isSelected) selectedFillPaint else fillPaint)

            // Draw border
            canvas.drawRect(block.bounds, if (isSelected) selectedPaint else boxPaint)
        }
    }

    override fun onTouchEvent(event: MotionEvent): Boolean {
        if (event.action == MotionEvent.ACTION_UP) {
            val tappedBlock = findBlockAt(event.x, event.y)
            selectedBlock = tappedBlock
            onBlockSelected?.invoke(tappedBlock)
            invalidate()
            return true
        }
        return true
    }

    /**
     * Find the text block at the given view coordinates.
     */
    fun findBlockAt(x: Float, y: Float): TextBlock? {
        // Return the smallest block containing the point
        // (in case of overlapping blocks, prefer the more specific one)
        return textBlocks
            .filter { it.bounds.contains(x, y) }
            .minByOrNull { it.bounds.width() * it.bounds.height() }
    }

    /**
     * Get the currently selected block.
     */
    fun getSelectedBlock(): TextBlock? = selectedBlock

    /**
     * Get all detected blocks.
     */
    fun getAllBlocks(): List<TextBlock> = textBlocks.toList()
}
