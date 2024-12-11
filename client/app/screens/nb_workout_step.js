import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InputDropdown from "../components/InputDropdown";

export default nb_workout_step = (props) => {

    const  {navigation} = props;

    const nbrWorkout = Array.from({ length: 7 }, (_, i) =>0 + i + 1).map(items => ({
        label: items.toString(),
        value: items
    }));
    const timeWorkout = Array.from({ length: 31 }, (_, i) =>(30 + i * 15)).map(items => ({
        label: items.toString() + " mins",
        value: items
    }));
    
    return (
        <View style={styles.container} >
            <InputDropdown
                label={"Number of workout sessions per week"} 
                placeholder= {"0"}
                value={props.value.nbrWorkout} 
                onFocus={props.onFocus} 
                onValueChange={props.onChangeTextNWorkout}
                data={nbrWorkout}
            />
            <InputDropdown
                label={"Number of minutes per workout session"}
                placeholder= {"0"}
                value={props.value.timeWorkout} 
                onFocus={props.onFocus} 
                onValueChange={props.onChangeTextTWorkout}
                data={timeWorkout}
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15
    }
})