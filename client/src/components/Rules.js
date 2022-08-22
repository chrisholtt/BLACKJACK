import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

const Rules = () => {

    const [activeStep, setActiveStep] = useState(0);

    const steps = ['Step One', 'Step Two', 'Step Three'];

    const description = ['Description of first step', 'Description of second step', 'Description of third step'];

    const images = ["https://cdn.britannica.com/55/174255-050-526314B6/brown-Guernsey-cow.jpg", "https://upload.wikimedia.org/wikipedia/commons/8/8c/Cow_%28Fleckvieh_breed%29_Oeschinensee_Slaunger_2009-07-07.jpg", "https://media.4-paws.org/e/8/2/7/e82789b9dc8a986d3b61c0aa7610affeecb93933/VIER%20PFOTEN_2015-04-27_010-1927x1333.jpg"];

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    const handleReset = () => {
        setActiveStep(0);
    }

    return (
        <div className="wrapper">
            <div className="rules display" >
                <Box sx={{width: '100%'}}>
                    <Stepper activeStep={activeStep}>
                        {steps.map((step, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={index} {...stepProps}>
                                    <StepLabel {...labelProps}>{step}</StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <>
                            <Typography sx={{mt: 2, mb: 1}}>
                                All Steps completed - you done
                            </Typography>
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Box sx={{flex: '1 1 auto'}} />
                                <Link to="/"><Button>Return to home</Button></Link>
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography sx={{ mt: 2, mb: 1}}>{description[activeStep]}</Typography>
                            <img src={images[activeStep]} />
                            <Box sx={{display: 'flex', flexDirection: 'row', pt: 2}}>
                                <Button 
                                    color="inherit"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1}}
                                >
                                    Back
                                </Button>
                                <Box sx={{ flex: '1 1 auto'}} />
                                <Button onClick={handleNext}>
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </Box>
                        </>
                    ) }
                </Box>
            </div>
        </div>
    )
}

export default Rules;