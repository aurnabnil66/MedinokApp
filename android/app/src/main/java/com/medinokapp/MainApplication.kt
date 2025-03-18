// package com.medinokapp

// import android.app.Application
// import com.facebook.react.PackageList
// import com.facebook.react.ReactApplication
// import com.facebook.react.ReactHost
// import com.facebook.react.ReactNativeHost
// import com.facebook.react.ReactPackage
// import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
// import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
// import com.facebook.react.defaults.DefaultReactNativeHost
// import com.facebook.react.soloader.OpenSourceMergedSoMapping
// import com.facebook.soloader.SoLoader
// import com.alarm.Package as AlarmPackage
// // import android.app.Application
// import android.content.Context
// // import android.content.Intent
// import android.os.Build
// // import android.provider.Settings

// import com.oblador.vectoricons.VectorIconsPackage;
// import android.content.Intent
// import android.net.Uri
// import android.os.PowerManager
// import android.provider.Settings

// class MainApplication : Application(), ReactApplication {

//   override val reactNativeHost: ReactNativeHost =
//       object : DefaultReactNativeHost(this) {
//         override fun getPackages(): List<ReactPackage> =
//             PackageList(this).packages.apply {
//               // Packages that cannot be autolinked yet can be added manually here, for example:
//               // add(MyReactNativePackage())
//               add(AlarmPackage()) // Add your Alarm Package here
//               VectorIconsPackage()
//             }

//         override fun getJSMainModuleName(): String = "index"

//         override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG

//         override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
//         override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
//       }

//   override val reactHost: ReactHost
//     get() = getDefaultReactHost(applicationContext, reactNativeHost)

//   override fun onCreate() {
//     super.onCreate()
//     SoLoader.init(this, OpenSourceMergedSoMapping)
//     if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
//       // If you opted-in for the New Architecture, we load the native entry point for this app.
//       load()
//     }
//   }
//   fun checkBatteryOptimization(context: Context) {
//     val powerManager = context.getSystemService(Context.POWER_SERVICE) as PowerManager
//     if (!powerManager.isIgnoringBatteryOptimizations(context.packageName)) {
//         val intent = Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS)
//         intent.data = Uri.parse("package:${context.packageName}")
//         context.startActivity(intent)
//     }
// }
// }


package com.medinokapp

import android.app.Application
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.PowerManager
import android.provider.Settings

import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactHost
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactHost.getDefaultReactHost
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader

import com.oblador.vectoricons.VectorIconsPackage
import com.alarm.Package as AlarmPackage

class MainApplication : Application(), ReactApplication {

    override val reactNativeHost: ReactNativeHost =
        object : DefaultReactNativeHost(this) {
            override fun getPackages(): List<ReactPackage> {
                val packages = PackageList(this).packages.toMutableList()
                packages.add(AlarmPackage()) // Add your Alarm Package here
                packages.add(VectorIconsPackage()) // Corrected placement
                return packages
            }

            override fun getJSMainModuleName(): String = "index"
            override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
            override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
            override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
        }

    override val reactHost: ReactHost
        get() = getDefaultReactHost(applicationContext, reactNativeHost)

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, OpenSourceMergedSoMapping)
        if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
            load()
        }
    }

    fun checkBatteryOptimization() {
        val powerManager = getSystemService(Context.POWER_SERVICE) as PowerManager
        if (!powerManager.isIgnoringBatteryOptimizations(packageName)) {
            val intent = Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS)
            intent.data = Uri.parse("package:$packageName")
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK) // Ensures correct context
            startActivity(intent)
        }
    }
}
