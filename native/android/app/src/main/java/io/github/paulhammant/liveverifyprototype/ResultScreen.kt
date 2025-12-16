package io.github.paulhammant.liveverifyprototype

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.selection.SelectionContainer
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.asImageBitmap
import androidx.compose.ui.platform.LocalClipboardManager
import androidx.compose.ui.text.AnnotatedString
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import io.github.paulhammant.liveverifyprototype.core.VerificationClassification

@Composable
fun ResultScreen(
    result: ScanResultUi,
    progressMessage: String?,
    overlay: OverlayModel?,
    onNormalizedTextChange: (String) -> Unit,
    onReverify: () -> Unit,
    onVerifyAnother: () -> Unit,
    onOverlayDismiss: () -> Unit,
) {
    val scrollState = rememberScrollState()
    val clipboard = LocalClipboardManager.current

    var tab by remember { mutableStateOf(ResultTab.CAPTURED) }

    Box(modifier = Modifier.fillMaxSize()) {
        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(14.dp),
        ) {
            Text(
                text = "Result",
                fontSize = 20.sp,
                fontWeight = FontWeight.SemiBold,
            )

            StatusCard(result)

            HashCard(
                hash = result.hashHex,
                onCopy = { hash -> clipboard.setText(AnnotatedString(hash)) },
                onReverify = onReverify,
                onVerifyAnother = onVerifyAnother,
            )

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFFF1F5F9), RoundedCornerShape(14.dp))
                    .padding(14.dp),
                verticalArrangement = Arrangement.spacedBy(10.dp),
            ) {
                TabRow(
                    selectedTabIndex = tab.ordinal,
                    containerColor = Color.Transparent,
                ) {
                    ResultTab.entries.forEach { t ->
                        Tab(
                            selected = tab == t,
                            onClick = { tab = t },
                            text = { Text(t.label) }
                        )
                    }
                }

                when (tab) {
                    ResultTab.CAPTURED -> Image(
                        bitmap = result.capturedBitmap.asImageBitmap(),
                        contentDescription = null,
                        modifier = Modifier
                            .fillMaxWidth()
                            .background(Color.White, RoundedCornerShape(12.dp))
                            .padding(2.dp)
                    )
                    ResultTab.EXTRACTED -> SelectionContainer {
                        Text(
                            text = result.rawText ?: "(no OCR text)",
                            fontFamily = FontFamily.Monospace,
                            fontSize = 12.sp,
                        )
                    }
                    ResultTab.NORMALIZED -> {
                        OutlinedTextField(
                            value = result.normalizedDraft,
                            onValueChange = onNormalizedTextChange,
                            modifier = Modifier
                                .fillMaxWidth()
                                .height(220.dp),
                            textStyle = androidx.compose.ui.text.TextStyle(
                                fontFamily = FontFamily.Monospace,
                                fontSize = 12.sp,
                            ),
                            label = { Text("Normalized text (editable)") },
                        )
                        Text(
                            text = "Edit to fix OCR errors, then tap Re-verify.",
                            fontSize = 12.sp,
                            color = Color.Black.copy(alpha = 0.7f),
                        )
                    }
                }
            }

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .background(Color(0xFFF1F5F9), RoundedCornerShape(14.dp))
                    .padding(14.dp),
            ) {
                Text(text = "Note", fontWeight = FontWeight.SemiBold)
                Spacer(modifier = Modifier.height(6.dp))
                Text(
                    text = "Only the OCR’d text (after normalization rules) is checked against the issuer endpoint. Screenshots of “Verified” overlays are not proof of anything.",
                    fontSize = 12.sp,
                    color = Color.Black.copy(alpha = 0.75f),
                )
            }
        }

        if (progressMessage != null) {
            ProcessingOverlay(message = progressMessage)
        }

        if (overlay != null) {
            VerificationOverlay(overlay = overlay, onDismiss = onOverlayDismiss)
        }
    }
}

private enum class ResultTab(val label: String) {
    CAPTURED("Captured"),
    EXTRACTED("Extracted Text"),
    NORMALIZED("Normalized"),
    ;
}

@Composable
private fun StatusCard(result: ScanResultUi) {
    val statusColor = when (result.outcome.classification) {
        VerificationClassification.AFFIRMING -> Color(0xFF22C55E)
        VerificationClassification.DENYING -> Color(0xFFEF4444)
        VerificationClassification.UNKNOWN -> Color(0xFF64748B)
    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(statusColor.copy(alpha = 0.08f), RoundedCornerShape(14.dp))
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        Text(text = "Verification Status", fontWeight = FontWeight.SemiBold)
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .background(statusColor, RoundedCornerShape(99.dp))
                    .padding(horizontal = 10.dp, vertical = 4.dp)
            ) {
                Text(
                    text = result.outcome.displayText,
                    color = Color.White,
                    fontSize = 12.sp,
                    fontWeight = FontWeight.SemiBold,
                )
            }
            Spacer(modifier = Modifier.weight(1f))
        }

        result.verificationUrl?.let {
            SelectionContainer {
                Text(
                    text = it.toString(),
                    fontFamily = FontFamily.Monospace,
                    fontSize = 11.sp,
                    color = Color.Black.copy(alpha = 0.7f),
                )
            }
        }

        result.outcome.policyLink?.let { policy ->
            Text(
                text = "Policy: $policy",
                fontSize = 12.sp,
                color = Color.Black.copy(alpha = 0.7f),
            )
        }
    }
}

@Composable
private fun HashCard(
    hash: String?,
    onCopy: (String) -> Unit,
    onReverify: () -> Unit,
    onVerifyAnother: () -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .background(Color(0xFFF1F5F9), RoundedCornerShape(14.dp))
            .padding(14.dp),
        verticalArrangement = Arrangement.spacedBy(10.dp),
    ) {
        Text(text = "SHA-256", fontWeight = FontWeight.SemiBold)
        if (hash != null) {
            SelectionContainer {
                Text(
                    text = hash,
                    fontFamily = FontFamily.Monospace,
                    fontSize = 12.sp,
                )
            }

            Row(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                Button(
                    onClick = { onCopy(hash) },
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF334155)),
                    shape = RoundedCornerShape(10.dp),
                ) {
                    Text("Copy Hash")
                }

                Button(
                    onClick = onReverify,
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF2563EB)),
                    shape = RoundedCornerShape(10.dp),
                ) {
                    Text("Re-verify")
                }

                Spacer(modifier = Modifier.weight(1f))

                Button(
                    onClick = onVerifyAnother,
                    colors = ButtonDefaults.buttonColors(containerColor = Color(0xFF0F172A)),
                    shape = RoundedCornerShape(10.dp),
                ) {
                    Text("Verify Another")
                }
            }
        } else {
            Text(text = "No hash available.", color = Color.Black.copy(alpha = 0.65f))
        }
    }
}

