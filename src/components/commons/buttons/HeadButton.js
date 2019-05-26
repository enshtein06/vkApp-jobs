import React from 'react';
import { 
    HeaderButton, 
    platform, 
    IOS
 } from '@vkontakte/vkui';
import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';

 const osname = platform();

const HeadButton = (props) => {
    return (
        <HeaderButton {...props}>{osname === IOS ? <Icon28ChevronBack/> : <Icon24Back/>}</HeaderButton>
    )
}

export default HeadButton;
