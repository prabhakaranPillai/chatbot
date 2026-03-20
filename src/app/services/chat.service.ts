import { Injectable } from '@angular/core';
import { BehaviorSubject, generate, Observable } from 'rxjs';

export interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private botReply$ = new BehaviorSubject<Message | {}>({})
  private messages: Message[] = [];

  generateBotResponse(query: string) {
    let userQuery = query ? query.trim().toLowerCase() : '';
    let response: string = ''
    switch (userQuery) {
      case 'hi':
        response = 'Hi, how are you doing, how can i can assist you?';
        break;
      case 'hello':
        response = 'Hi,how are you doing, i am chat bot, i can assist with your any query!';
        break;

      case 'help':
        response = 'Hi, Can you please specify your problem more clearly';
        break;

      case 'pricing':
        response = 'Our products starts from 100k and range upto 400K!';
        break;

      case 'delivery':
        response = 'Delivery is availabe all over India at free of cost';
        break;

      case 'timing':
        response = 'Our shop open  @10 A.M. and closes @08 P.M.';
        break;

      case 'category':
        response = 'Daily use clothing | custom desinged clothes | party Wears | Trending';
        break;

        case 'discount':
        response = 'Standard Discount of 10% applicable for all categories!';
        break;
        case 'contact':
        response = 'Ph: 9890284023';
        break;
        case 'address':
        response = 'Shop: 02,nelson complex, 10 cross street, adayar, chennai ';
        break;
        case 'email':
        response = 'trend.sa@gmail.com';
        break;
      default:
        response = `Thanks for reaching Out, I didn't understand your query clearly, can you please more eloborate!`
        break;
    }
    return response;
  }
  // genrete the reply
  processChatDetails(chat: Message): Observable<Message> {
    this.messages.push(chat);
    // process the current chat and return the bot's reply   
    let botReply: Message = {
      text: this.generateBotResponse(chat.text),
      sender: 'bot',
      timestamp: new Date()
    };
    this.messages.push(botReply);

    return new Observable<Message>(obs => {

      obs.next(botReply);
    });
  }
  constructor() { }
}
