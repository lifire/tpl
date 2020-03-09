import tpl from './header.tpl'
import './header.less'

import img from '../img/images/logo.png'

function headerTpl() {
    return {
        name: 'header',
        tpl: tpl({
            img: img
        })
    }
}

export default headerTpl