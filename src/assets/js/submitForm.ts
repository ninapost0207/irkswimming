"use strict";
import modal from './modal.js';


function submitForm() {
      
    const _form = document.querySelector('#form-submit');
    
    _form?.addEventListener('submit', (e) => {
        e.preventDefault();
         
        let _name = document.querySelector('#name') as HTMLInputElement;
        let _phone = document.querySelector('#phone') as HTMLInputElement;
        let _info = document.querySelector('#info') as HTMLInputElement;
        
       
        if (_name.value !== "" && _phone.value !== "") {
          let message = {
              name: _name.value,
              phone: _phone.value,
              info: _info.value
          }            
          sendMessage(message)
          _name.value = "";
          _phone.value = "";
          _info.value = "";
        }
        
    
        
    })
    
};
function sendMessage(message) {
    const bot = new Bot("6379245837:AAFfp8FBOAPTK7sUQHcdZVwpYC5s-1NT7dY", "1715714284");
    modal(true);
    bot.sendMessage(JSON.stringify(message), null, null, true)
        //.then(res => {})
        .catch(err => alert(err))    
}

class TelegramBotSetup {
    readonly token: string;  
    readonly requestUrl: string;

    constructor(token) {        
      this.token = token;
      this.requestUrl = 'https://api.telegram.org/bot';
    }
  
    api(type, method, body?) {
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
    dcid: string;
    constructor(botToken, defaultChatID) {
      super(botToken);
      this.dcid = defaultChatID;
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
    
export default submitForm;
