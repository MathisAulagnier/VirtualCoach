import React from "react";
import { StyleSheet, Text, View } from "react-native";
import InputIcon from "../components/InputIcon";
import InputDropdown from "../components/InputDropdown";

export default StepTwoView = (props) => {

    const bodyWeightSquatArray = Array.from({ length: 196 }, (_, i) =>4 + i + 1).map(items => ({
        label: items.toString(),
        value: items
    }));
    const pushUpArray = Array.from({ length: 196 }, (_, i) =>4 + i + 1).map(items => ({
        label: items.toString(),
        value: items
    }));

    const pullUpArray = Array.from({ length: 50}, (_, i) =>0 + i + 1).map(items => ({
        label: items.toString(),
        value: items
    }));

    const  {navigation} = props;
    return (
        <View style={styles.container} >
            <InputDropdown label={"How many bodyweight squats can you do ?"} 
                style={{marginVertical: 10}} 
                placeholder= {"0"}
                value={props.value.bodyWeightSquat} 
                onFocus={props.onFocus} 
                onValueChange={props.onChangeTextBW}
                data={bodyWeightSquatArray}
            />
            <InputDropdown label={"How many push-ups can you do ?"} 
                style={{marginVertical: 10}}
                placeholder= {"0"}
                value={props.value.pushUp} 
                onFocus={props.onFocus} 
                onValueChange={props.onChangeTextPshUp}
                data={pushUpArray}
                
            />
            <InputDropdown label={"How many pull-ups can you perform ?"} 
                style={{marginVertical: 10}}
                placeholder= {"0"}
                value={props.value.pullUp} 
                onFocus={props.onFocus} 
                onValueChange={props.onChangeText}
                data={pullUpArray}
            />
        </View>
    )
}

const styles = StyleSheet.create ({
    container : {
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
        paddingVertical: 15
    }
})