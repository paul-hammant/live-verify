package io.github.paulhammant.liveverifyprototype

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable

@Composable
fun LiveVerifyApp() {
    MaterialTheme {
        Surface(color = MaterialTheme.colorScheme.background) {
            LiveVerifyScreen()
        }
    }
}
