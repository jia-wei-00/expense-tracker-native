package expo.modules.credentialmanager

import android.content.Context
import androidx.core.os.budleOf
import android.content.SharedPreferences
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class CredentialManagerModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("CredentialManager")

    Events("onChange")

    Function("setTheme") { theme: String ->
      getPreferences().edit().putString("theme", theme).apply()
      this@CredentialManagerModule.sendEvent("onChange", bundlOf("theme" to theme))
    }

    Function("getTheme") {
      return@Function getPreferences().getString("theme", "system")
    }
  }

  private val context: Context
    get() = requireNotNull(appContext.reactContext)

  private fun getPreferences(): SharedPreferences
    return context.getSharedPreferences(context.packageName + ".credential_manager", Context.MODE_PRIVATE)
}
