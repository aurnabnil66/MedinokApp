package com.medinokapp

import android.app.Activity
import android.os.Bundle
import android.view.WindowManager
import com.medinokapp.R
import com.facebook.react.ReactActivity

class AlarmFullscreenActivity : ReactActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)

        window.addFlags(
            WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
            WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON or
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        )
    }

    override fun getMainComponentName(): String? {
        return "AlarmScreen" // Must match the name registered with AppRegistry
    }
}