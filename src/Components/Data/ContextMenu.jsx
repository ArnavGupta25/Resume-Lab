import React from 'react';
import { Box, List, ListItem} from '@chakra-ui/react';

const ContextMenu = ({ menuItems, position, onClose, bgcolor, color }) => {
    if (!position) return null;
    const shadow = `drop-shadow(0px 0px 2px ${color})`;

    return (
    <Box
        position="absolute"
        top={position.y}
        left={position.x}
        bg={bgcolor}
        filter={shadow}
        color={color}
        padding={2}
        boxShadow="md"
        borderRadius="md"
        zIndex={1000}
        onClick={onClose}
    >
    <List spacing={1}>
        {menuItems.map((item, index) => (
        <ListItem key={index} padding={2} _hover={{ bg: bgcolor, cursor: 'pointer', color: color, filter: shadow }} onClick={item.onClick}>
            {item.label}
        </ListItem>
        ))}
    </List>
    </Box>
    );
};

export default ContextMenu;
