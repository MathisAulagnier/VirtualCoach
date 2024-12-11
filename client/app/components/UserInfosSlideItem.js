import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Colors } from "../../constants/Colors";
import { SIZES } from "../../constants/styles";
import { data } from "../../constants/dataObjective";
import Nb_workout_step from "../screens/nb_workout_step";
import StepTwoView from "../screens/StepTwoView";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../hooks/globalSlice";

export default function UserInfosSlideItem(props) {
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();
  const reduxUserData = useSelector((state) => state.global.userData);

  const [currentObjective, setCurrentObjective] = useState(reduxUserData.objective?reduxUserData.objective:"");
  const [currentSpecification, setCurrentSpecification] = useState(reduxUserData.specification?reduxUserData.specification:"");
  // const [currentObjective, setCurrentObjective] = useState("");
  // const [currentSpecification, setCurrentSpecification] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  // console.log("=============1",currentObjective);
  // console.log("=============2",currentSpecification);
  
  const handleObjectivePress = (objective) => {
    setCurrentObjective(objective);
    setCurrentSpecification(null);
  };

  const handleSpecificationChange = async (specification) => {
    setCurrentSpecification(specification.value);
    console.log("handleSpecificationChange000000000000 : ", specification);
    
    await saveObjectSpec(currentObjective, specification.value).then(props.scrollTo())
  };

  
  const [bodyWeightSquat, setBodyWeightSquat] = useState(0);
  const [pushUp, setPushUp] = useState(0);
  const [pullUp, setPullUp] = useState(0);
  const [nbrWorkout, setNbrWorkout] = useState(reduxUserData.nbrWorkout?reduxUserData.nbrWorkout:0);
  const [timeWorkout, setTimeWorkout] = useState(reduxUserData.timeWorkout?reduxUserData.timeWorkout:0);
  // const [nbrWorkout, setNbrWorkout] = useState(0);
  // const [timeWorkout, setTimeWorkout] = useState(0);

  // console.log("========>>>>>>",currentObjective, currentSpecification, timeWorkout, nbrWorkout);


  const handleBodyWeightSquatChange = (text) => {
    setBodyWeightSquat(text.value);
  };

  const handlePushUpChange = (text) => {
    setPushUp(text.value);
  };
  
  const handlePullUpChange = (text) => {
    setPullUp(text.value);
  };

  const handleNbrWorkoutChange = (text) => {
      setNbrWorkout(text.value);
  };

  const handleTimeWorkoutChange = (text) => {
    setTimeWorkout(text.value);
  };

  
  const saveObjectSpec = async (objective, specification) => {
    console.log("========>>>>>>SEBUUUUUT",reduxUserData, objective, specification);
    try {
      dispatch(setUserData({
        ...reduxUserData,
        objective: objective,
        specification: specification,
      }))

      console.log("========>>>>>>FINNNN",reduxUserData, objective, specification);
    } catch (error) {
      console.log('Error saving data:', error);
    }
  };

  console.log("nbrWorkout: ", nbrWorkout, "timeWorkout: ", timeWorkout, "bodyWeightSquat: ", bodyWeightSquat, "pushUp: ", pushUp, "pullUp: ", pullUp);
  console.log(reduxUserData);
  
  useEffect(() => {
    if (nbrWorkout && timeWorkout) {
      props.scrollTo(nbrWorkout, timeWorkout);
    }
  }, [nbrWorkout, timeWorkout]);

  useEffect(() => {
    if (bodyWeightSquat && pushUp && pullUp ) {
      props.scrollTo(bodyWeightSquat, pushUp, pullUp);
    }
  }, [bodyWeightSquat, pushUp, pullUp]);

  return (
    <View style={[styles.container, { width }]}>
      <ScrollView style={{ flex: 0.7, marginBottom: 10 }}>
        {props.item.title && <Text style={styles.title}>{props.item.title}</Text>}
        {props.item.description && <Text style={styles.description}>{props.item.description}</Text>}
        {props.item.step_one && (
          <View style={{ flex: 0.7, alignItems: "center" }}>
            <Text style={styles.sectionTitle}>What is your objective ?</Text>
            {props.item.step_one.map((objective, index) => (
              <View style={styles.buttonSelect} key={index}>
                <Dropdown
                  style={[
                      styles.dropdown,
                      isFocus && currentObjective === objective && {
                          borderColor: Colors.whitesmoke2,
                          backgroundColor: Colors.whitesmoke3,
                      },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={
                    objective === "Lose Weight"
                        ? data.lose_weight
                        : objective === "Stay Fit"
                        ? data.stay_fit
                        : objective === "Get Stronger"
                        ? data.get_stronger
                        : objective === "Improve Cardio"
                        ? data.improve_cardio
                        : objective === "Gain Muscle Mass"
                        ? data.increase_muscle_mass
                        : objective === "Tone and Sculpt"
                        ? data.tone_and_sculpt
                        : objective === "Prepare for an Event"
                        ? data.prepare_for_event
                        : objective === "Learn a Movement"
                        ? data.learn_movement
                        : objective === "Rehabilitate After an Injury"
                        ? data.rehabilitate_after_injury
                        : []
                  }
                  search
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? objective : objective}
                  searchPlaceholder="Search specification..."
                  value={currentObjective === objective ? currentSpecification : null}
                  onFocus={() => {
                      setIsFocus(true);                      
                      handleObjectivePress(objective);
                  }}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => handleSpecificationChange(item)}
                />
              </View>
            ))}
          </View>
        )}
        {props.item.step_two ?
            <StepTwoView
                value={{ bodyWeightSquat, pushUp, pullUp }}
                onChangeTextBW={handleBodyWeightSquatChange}
                onChangeTextPshUp={handlePushUpChange}
                onChangeText={handlePullUpChange}
            />
            : null}

        {props.item.nb_workout_step ?
            <Nb_workout_step
                value={{ nbrWorkout, timeWorkout }}
                onChangeTextNWorkout={handleNbrWorkoutChange}
                onChangeTextTWorkout={handleTimeWorkoutChange}
            />
            : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
  title: {
    fontWeight: "800",
    fontSize: 25,
    width: SIZES.width - 25,
    marginBottom: 10,
    lineHeight: 35,
    color: Colors.blueb,
    textAlign: "left",
    marginTop: 15,
  },
  description: {
    fontWeight: "400",
    fontSize: 17,
    paddingBottom: 15,
    width: SIZES.width - 10,
    color: Colors.blueb,
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 4,
    marginVertical: 10,
    color: Colors.black,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  buttonSelect: {
    paddingVertical: 5,
  },
  dropdown: {
    height: 50,
    borderColor: Colors.whitesmoke,
    backgroundColor: Colors.whitesmoke,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: SIZES.height / 15,
    marginTop: 4,
    marginBottom: 4,
    width: SIZES.width - 25,
  },
});
