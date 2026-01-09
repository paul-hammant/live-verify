# Add project specific ProGuard rules here.

# ML Kit
-keep class com.google.mlkit.** { *; }

# OkHttp
-dontwarn okhttp3.**
-dontwarn okio.**
-keep class okhttp3.** { *; }
-keep interface okhttp3.** { *; }

# Keep data classes
-keep class com.liveverify.app.TextNormalizer$** { *; }
-keep class com.liveverify.app.VerificationResult$** { *; }
-keep class com.liveverify.app.VerificationLogic$** { *; }
