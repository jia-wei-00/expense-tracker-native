import ExpoModulesCore

public class CredentialManagerModule: Module {
  public func definition() -> ModuleDefinition {
    Name("CredentialManager")

    Events("onChange")

    Function("setTheme") { (theme: Theme) -> Void in
      UserDefaults.standard.set(theme.rawValue, forKey:"theme")
      sendEvent("onChange", [
        "theme": theme.rawValue
      ])
    }

    Function("getTheme") { () -> String in
      UserDefaults.standard.string(forKey: "theme") ?? Theme.system.rawValue
    }
  }

  enum Theme: String, Enumerable {
    case light
    case dark
    case system
  }
}
