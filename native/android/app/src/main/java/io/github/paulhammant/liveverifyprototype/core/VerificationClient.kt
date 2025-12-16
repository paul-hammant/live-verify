package io.github.paulhammant.liveverifyprototype.core

import kotlinx.coroutines.suspendCancellableCoroutine
import kotlinx.serialization.json.Json
import okhttp3.Call
import okhttp3.Callback
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.io.IOException
import java.net.URI
import kotlin.coroutines.resume
import kotlin.coroutines.resumeWithException

class VerificationClient(
    private val httpClient: OkHttpClient = OkHttpClient(),
    private val json: Json = Json { ignoreUnknownKeys = true },
) {
    suspend fun fetchVerificationMeta(baseUrl: String): VerificationMeta? {
        return runCatching {
            val metaUrl = VerifyLineParser.buildMetaUrl(baseUrl)
            val request = Request.Builder()
                .url(metaUrl.toURL())
                .header("Cache-Control", "no-store")
                .get()
                .build()

            val response = httpClient.newCall(request).await()
            response.use { r ->
                if (r.code != 200) return null
                val body = r.body?.string() ?: return null
                json.decodeFromString(VerificationMeta.serializer(), body)
            }
        }.getOrNull()
    }

    suspend fun verify(verificationUrl: URI, meta: VerificationMeta?): VerificationOutcome {
        val request = Request.Builder()
            .url(verificationUrl.toURL())
            .header("Cache-Control", "no-store")
            .get()
            .build()

        val response = httpClient.newCall(request).await()
        response.use { r ->
            val body = r.body?.string() ?: ""
            return VerificationResponseInterpreter.interpret(
                httpStatus = r.code,
                body = body,
                verificationUrl = verificationUrl,
                meta = meta,
            )
        }
    }
}

private suspend fun Call.await(): Response {
    return suspendCancellableCoroutine { cont ->
        enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                if (cont.isCancelled) return
                cont.resumeWithException(e)
            }

            override fun onResponse(call: Call, response: Response) {
                cont.resume(response)
            }
        })

        cont.invokeOnCancellation {
            runCatching { cancel() }
        }
    }
}

