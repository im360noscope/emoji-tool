package com.zacksimpson.emojis

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import com.thelightphone.sdk.ui.LightText
import com.thelightphone.sdk.ui.LightTextVariant
import com.thelightphone.sdk.ui.gridUnitsAsDp
import com.thelightphone.sdk.ui.lightClickable

/**
 * Settings-row control ported from weather-tool's "Units" row: a label above, the current value
 * below, tap anywhere to cycle. An alternative to ToggleSwitch's on/off icon style for settings
 * better described by two named states than "on"/"off".
 */
@Composable
fun SelectSettingRow(
    label: String,
    value: String,
    onClick: () -> Unit,
) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .lightClickable(onClick = onClick)
            .padding(horizontal = 1.5f.gridUnitsAsDp(), vertical = 0.75f.gridUnitsAsDp()),
    ) {
        LightText(text = label, variant = LightTextVariant.Detail)
        LightText(text = value, variant = LightTextVariant.Heading)
    }
}
