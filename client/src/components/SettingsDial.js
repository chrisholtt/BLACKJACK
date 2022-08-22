import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeXmark, faUser, faCreditCard } from '@fortawesome/free-solid-svg-icons';


const SettingsDial = () => {

    const actions = [
        { icon: <FontAwesomeIcon icon={faUser} />, name: 'Account', action: handleClick, operation: 'account' },
        { icon: <FontAwesomeIcon icon={faCreditCard} />, name: 'Purchase coins', action: handleClick, operation: 'purchase'},
        { icon: <FontAwesomeIcon icon={faVolumeXmark} />, name: 'Mute', action: handleClick, operation: 'mute' }
    ];

    function handleClick(e){
        console.log(e);
        // Handle option selected by the user
    }

    return (
        <Box sx={{ height: 320, transofrm: 'translateZ(0px)', flexGrow: 1}}>
            <SpeedDial
            ariaLabel="Settings speed dial"
            sx={{ position: 'absolute', bottom: 16, right: 16, }}
            icon={<SpeedDialIcon />}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    value={action.name}
                    onClick={(e) => {
                        handleClick(e.target.value)
                    }}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}

export default SettingsDial;