import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Features/ActiveMetrics/sliceReducer';

export default function Checkboxes() {
    const [state, setState] = React.useState({
        checkedA: false,
        checkedB: false,
        checkedC: false,
        checkedD: false,
        checkedE: false,
        checkedF: false,
    });

    const timeStamp = useSelector(state => state.heartbeat);
    const dispatch = useDispatch();
    const activeArr = useSelector(state => state.activeMetrics.selectedMetrics);

    console.log("activeArr:  " + activeArr)

    const handleChange = name => event => {
        const metric = event.target.value;
        const isChecked = event.target.checked;
        setState({ ...state, [name]: event.target.checked });
        console.log(metric)

        if (isChecked) {
            dispatch(
                actions.active({
                    metricName: metric,
                    before: timeStamp.current,
                    after: timeStamp.past,
                }),
            );
        } else {
            const metricIndex = activeArr.find(element => element.metricName === metric);
            dispatch(actions.remove(metricIndex.metricName));
        }
    };

    return (
        <div>
            <h1>Select Metrics From Below:</h1>
            <FormControl component="fieldset">
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        value="end"
                        control={
                            <Checkbox
                                checked={state.checkedA}
                                onChange={handleChange('checkedA')}
                                value="flareTemp"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label="Flare Temp"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="top"
                        control={
                            <Checkbox
                                checked={state.checkedB}
                                onChange={handleChange('checkedB')}
                                value="injValveOpen"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label="INJ Valve Open"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="start"
                        control={
                            <Checkbox
                                checked={state.checkedC}
                                onChange={handleChange('checkedC')}
                                value="oilTemp"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label="Oil Temp"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="end"
                        control={
                            <Checkbox
                                checked={state.checkedD}
                                onChange={handleChange('checkedD')}
                                value="casingPressure"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label="Casing Pressure"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="bottom"
                        control={
                            <Checkbox
                                checked={state.checkedE}
                                onChange={handleChange('checkedE')}
                                value="tubingPressure"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label="Tubing Pressure"
                        labelPlacement="top"
                    />
                    <FormControlLabel
                        value="end"
                        control={
                            <Checkbox
                                checked={state.checkedF}
                                onChange={handleChange('checkedF')}
                                value="waterTemp"
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        label="Water Temp"
                        labelPlacement="top"
                    />
                </FormGroup>
            </FormControl>
        </div>
    );
}
