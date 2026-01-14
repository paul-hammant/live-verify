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

import android.graphics.Bitmap
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView

/**
 * ViewPager2 adapter for diagnostic tabs showing:
 * - Tab 0: Captured image
 * - Tab 1: Extracted (raw OCR) text with return symbols
 * - Tab 2: Normalized text + hash
 */
class DiagnosticAdapter : RecyclerView.Adapter<DiagnosticAdapter.DiagnosticViewHolder>() {

    var capturedImage: Bitmap? = null
        set(value) {
            field = value
            notifyItemChanged(0)
        }

    var extractedText: String = ""
        set(value) {
            field = value
            notifyItemChanged(1)
        }

    var normalizedText: String = ""
        set(value) {
            field = value
            notifyItemChanged(2)
        }

    var computedHash: String = ""
        set(value) {
            field = value
            notifyItemChanged(2)
        }

    override fun getItemCount(): Int = 3

    override fun getItemViewType(position: Int): Int = position

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): DiagnosticViewHolder {
        val inflater = LayoutInflater.from(parent.context)
        return when (viewType) {
            0 -> {
                val view = inflater.inflate(R.layout.diagnostic_image, parent, false)
                ImageViewHolder(view)
            }
            else -> {
                val view = inflater.inflate(R.layout.diagnostic_text, parent, false)
                TextViewHolder(view)
            }
        }
    }

    override fun onBindViewHolder(holder: DiagnosticViewHolder, position: Int) {
        when (holder) {
            is ImageViewHolder -> {
                holder.imageView.setImageBitmap(capturedImage)
            }
            is TextViewHolder -> {
                when (position) {
                    1 -> {
                        holder.textView.text = DiagnosticHelper.withReturnSymbols(extractedText)
                    }
                    2 -> {
                        val text = buildString {
                            append(normalizedText)
                            if (computedHash.isNotEmpty()) {
                                append("\n\n---\nHash: ")
                                append(computedHash)
                            }
                        }
                        holder.textView.text = text
                    }
                }
            }
        }
    }

    abstract class DiagnosticViewHolder(view: View) : RecyclerView.ViewHolder(view)

    class ImageViewHolder(view: View) : DiagnosticViewHolder(view) {
        val imageView: ImageView = view.findViewById(R.id.diagnosticImage)
    }

    class TextViewHolder(view: View) : DiagnosticViewHolder(view) {
        val textView: TextView = view.findViewById(R.id.diagnosticText)
    }
}
