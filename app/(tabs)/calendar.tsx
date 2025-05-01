import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScheduleCalendar from '../component/calendar'
import ScheduleCalendarTSX from '../component/calandar2'

export default function calendar() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View>
            </View>
            <ScheduleCalendar />
            {/* <ScheduleCalendarTSX/> */}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})