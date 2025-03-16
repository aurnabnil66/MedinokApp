package com.medinokapp;

import android.content.Intent;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;

public class AlarmActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_alarm); // Link to the layout file

        // Handle the alarm (e.g., display UI, play sound, etc.)
        // You can also check the intent for additional data
        Intent intent = getIntent();
        if (intent != null) {
            // Perform actions based on the intent
        }
    }
}