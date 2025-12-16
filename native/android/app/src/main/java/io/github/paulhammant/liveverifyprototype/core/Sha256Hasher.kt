package io.github.paulhammant.liveverifyprototype.core

import java.security.MessageDigest

object Sha256Hasher {
    fun hashHex(text: String): String {
        val digest = MessageDigest.getInstance("SHA-256").digest(text.toByteArray(Charsets.UTF_8))
        return digest.joinToString("") { "%02x".format(it) }
    }
}

