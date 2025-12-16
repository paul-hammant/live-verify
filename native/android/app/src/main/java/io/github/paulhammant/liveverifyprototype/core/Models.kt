package io.github.paulhammant.liveverifyprototype.core

import java.net.URI

enum class VerificationClassification {
    AFFIRMING,
    DENYING,
    UNKNOWN,
}

data class VerificationOutcome(
    val httpStatus: Int?,
    val statusCode: String?,
    val displayText: String,
    val classification: VerificationClassification,
    val authorityHost: String?,
    val policyLink: URI?,
    val rawBody: String?,
)

