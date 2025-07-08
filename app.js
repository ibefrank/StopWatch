import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Main App component for the Stopwatch
export default function App() {
  // State to keep track of elapsed time in milliseconds
  const [elapsed, setElapsed] = useState(0);
  // State to check if stopwatch is running
  const [running, setRunning] = useState(false);
  // Ref to store the interval ID
  const intervalRef = useRef(null);

  // Start the stopwatch
  const start = () => {
    if (running) return; // Prevent multiple intervals
    setRunning(true);
    // Calculate start time based on already elapsed time
    const startTime = Date.now() - elapsed;
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 10); // Update every 10ms for smoothness
  };

  // Stop the stopwatch
  const stop = () => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  // Reset the stopwatch
  const reset = () => {
    stop();
    setElapsed(0);
  };

  // Format milliseconds into HH:MM:SS.mmm
  const formatTime = (ms) => {
    const date = new Date(ms);
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Display the formatted elapsed time */}
      <Text style={styles.display}>{formatTime(elapsed)}</Text>
      <View style={styles.row}>
        {/* Stopwatch control buttons */}
        <Button label="Start" onPress={start} disabled={running} />
        <Button label="Stop" onPress={stop} disabled={!running} />
        <Button label="Reset" onPress={reset} />
      </View>
    </View>
  );
}

// Reusable Button component
function Button({ label, onPress, disabled }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, disabled && styles.buttonDisabled]}
      disabled={disabled}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

// Styles for the components
const styles = StyleSheet.create({
  container: { 
    flex: 1,
     justifyContent: 'center',
      padding: 20,
       backgroundColor: '#f4f4f4' },
  display: {
     fontSize: 48, 
     textAlign: 'center', 
     marginBottom: 40, 
     fontWeight: 'bold' },
  row: {
     flexDirection: 'row',
      justifyContent: 'space-between', 
      marginBottom: 10 },
  button: {
     backgroundColor: '#ddd',
      flex: 1, 
      margin: 5,
       padding: 20,
        borderRadius: 10 },
  buttonDisabled: {
     backgroundColor: '#bbb' },
  buttonText: { 
    fontSize: 20,
     textAlign: 'center' },
});