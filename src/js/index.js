import '../less/reset.less'
import HeaderTpl from '../components/header/header'
import BodyTpl from '../components/body/body'
console.log(1)

const App = function(){
    var dom=document.getElementById('app');
    let headerTpl=new HeaderTpl();
    let bodyTpl=new BodyTpl();
    dom.innerHTML=headerTpl.tpl + bodyTpl.tpl;
}

new App()

