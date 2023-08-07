import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                personal_bg_1: '#EBEBEB',
                personal_bg_card: '#F5F5F5',
                personal_text :'#27187E',
                personal_primary: '#00796B',
                //cor para chamadas de ação
                personal_action_1: '#09814A',
                personal_action_2: '#303F4A',
                personal_action_3: '#696D7D',
                personal_action_4: '#7B886B',
                personal_action_5: '#598381',
                personal_action_6: '#BC5724',
                //--------------------------
                primary: '#0D3B66',
                secondary: '#FF9800',
                anchor: '#8c9eff',
                
            },
        },
    },
});
