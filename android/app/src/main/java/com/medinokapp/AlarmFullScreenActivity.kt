package com.medinokapp

import android.media.AudioManager
import android.media.MediaPlayer
import android.os.Bundle
import android.view.WindowManager
import com.facebook.react.ReactActivity

class AlarmFullscreenActivity : ReactActivity() {

    companion object {
        var mediaPlayer: MediaPlayer? = null

        // Stop alarm sound when needed
        fun stopAlarmSound() {
            mediaPlayer?.let {
                if (it.isPlaying) {
                    it.stop()
                    it.release()
                }
                mediaPlayer = null
            }
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)

        // Set flags to show alarm even when the screen is off and in locked mode
        window.addFlags(
            WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED or
            WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON or
            WindowManager.LayoutParams.FLAG_FULLSCREEN
        )

        // Get AudioManager service
        val audioManager = getSystemService(AUDIO_SERVICE) as AudioManager

        // Set audio stream type to alarm
        audioManager.setStreamVolume(
            AudioManager.STREAM_ALARM,
            audioManager.getStreamMaxVolume(AudioManager.STREAM_ALARM),
            0
        )

        // Set the phone to alarm mode, to make sure the sound isn't affected by media or ringer volume
        audioManager.ringerMode = AudioManager.RINGER_MODE_NORMAL

        // Play the custom alarm sound
        mediaPlayer = MediaPlayer.create(this, R.raw.ringtone)  // Your custom sound file here
        mediaPlayer?.isLooping = true  // Loop the alarm sound until stopped
        mediaPlayer?.start()  // Start playing the sound
    }

    override fun getMainComponentName(): String? {
        return "AlarmScreen"  // This should match the name of the component in your AppRegistry
    }
}
