import ExpoModulesCore

public class CredentialManagerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("CredentialManager")

    Function("getTheme") {
      return@Function "system"
    }
  }
}
