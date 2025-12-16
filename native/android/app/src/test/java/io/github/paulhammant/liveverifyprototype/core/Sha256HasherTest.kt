package io.github.paulhammant.liveverifyprototype.core

import org.junit.Assert.assertEquals
import org.junit.Test

class Sha256HasherTest {
    @Test
    fun sha256Hello() {
        assertEquals(
            "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
            Sha256Hasher.hashHex("hello")
        )
    }

    @Test
    fun sha256HelloWorld() {
        assertEquals(
            "b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9",
            Sha256Hasher.hashHex("hello world")
        )
    }
}

