package io.github.paulhammant.liveverifyprototype

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun ProcessingOverlay(message: String) {
    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.55f)),
        contentAlignment = Alignment.Center,
    ) {
        Column(
            modifier = Modifier
                .padding(22.dp)
                .background(Color.Black.copy(alpha = 0.35f), RoundedCornerShape(16.dp))
                .padding(22.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(14.dp),
        ) {
            CircularProgressIndicator(color = Color.White)
            Text(
                text = message,
                color = Color.White,
                fontSize = 16.sp,
                fontWeight = FontWeight.SemiBold,
                textAlign = TextAlign.Center,
            )
        }
    }
}

@Composable
fun VerificationOverlay(overlay: OverlayModel, onDismiss: () -> Unit) {
    val cardColor = when (overlay.style) {
        OverlayModel.Style.AFFIRMING -> Color(0xFF22C55E)
        OverlayModel.Style.DENYING -> Color(0xFFEF4444)
        OverlayModel.Style.UNKNOWN -> Color(0xFF64748B)
    }

    val icon = when (overlay.style) {
        OverlayModel.Style.AFFIRMING -> "✓"
        OverlayModel.Style.DENYING -> "✗"
        OverlayModel.Style.UNKNOWN -> "?"
    }

    Box(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.Black.copy(alpha = 0.55f))
            .clickable(onClick = onDismiss),
        contentAlignment = Alignment.Center,
    ) {
        Column(
            modifier = Modifier
                .padding(16.dp)
                .background(cardColor.copy(alpha = 0.85f), RoundedCornerShape(20.dp))
                .padding(22.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(12.dp),
        ) {
            Text(
                text = icon,
                color = Color.White,
                fontSize = 52.sp,
                fontWeight = FontWeight.Bold,
            )

            Text(
                text = overlay.title,
                color = Color.White,
                fontSize = 20.sp,
                fontWeight = FontWeight.SemiBold,
                textAlign = TextAlign.Center,
            )

            if (overlay.detail.isNotBlank()) {
                Text(
                    text = overlay.detail,
                    color = Color.White.copy(alpha = 0.92f),
                    fontSize = 14.sp,
                    textAlign = TextAlign.Center,
                )
            }

            if (!overlay.domain.isNullOrBlank()) {
                Text(
                    text = overlay.domain,
                    color = Color.White.copy(alpha = 0.85f),
                    fontSize = 12.sp,
                    fontFamily = FontFamily.Monospace,
                    textAlign = TextAlign.Center,
                )
            }

            Spacer(modifier = Modifier.size(2.dp))

            Text(
                text = "Tap to continue",
                color = Color.White.copy(alpha = 0.85f),
                fontSize = 12.sp,
            )
        }
    }
}

