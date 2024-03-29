import modal from '../js/modal.js';

function submitForm() {
    const _form = document.querySelector('#form-submit');
    
    _form.addEventListener('submit', (e) => {
        e.preventDefault();
         
        let _name = document.querySelector('#name');
        let _phone = document.querySelector('#phone');
        let _info = document.querySelector('#info');

        

        let message = {
            name: _name.value,
            phone: _phone.value,
            info: _info.value
        }            
        
        sendMessage(message)
    
        _name.value = "";
        _phone.value = "";
        _info.value = "";
        
    })
    modal()
};
function sendMessage(message) {
    const bot = new Bot("---------------", "---------------");

    bot.sendMessage(JSON.stringify(message), null, null, true)
        .then(res => {
            console.log("Success!", res);
        })
        .catch(err => console.log(err))


    
}
class TelegramBotSetup {
    constructor(token) {
      this.token = token;
      this.requestUrl = 'https://api.telegram.org/bot';
    }
  
    api(type, method, body) {
      return new Promise((resolve, reject) => {
        fetch(this.requestUrl + this.token + type, {
          method: method,
          body: body
        }).then(res => {
          resolve(res.json())
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
  
  class Bot extends TelegramBotSetup {
    constructor(botToken, defaultChatID) {
      super(botToken);
      this.dcid = defaultChatID;
    }
  
    static start() {
      console.log("Send telegram message");
    }
  
    async getUpdates() {
      try {
        const result = await this.api('/getUpdates', 'GET')
        return await result
      } catch(e) {
        return await e
      }
    }
  
    async getMe() {
      try {
        const result = await this.api('/getMe', 'GET')
        return await result
      } catch(e) {
        return await e
      }
    }
  
    async sendMessage(text, chatID, parseMode, disableNotification) {
      try {
        const result = await this.api(`/sendMessage?text=${text}&chat_id=${chatID ? chatID : this.dcid}&parse_mode=${parseMode ? parseMode : 'html'}&disable_notification=${disableNotification ? disableNotification : false}`, 'GET')
        return await result
      } catch(e) {
        return await e
      }
    }
  };
  Bot.start()  
export default submitForm;

