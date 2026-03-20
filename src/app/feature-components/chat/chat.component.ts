import { Component, ElementRef, ViewChild, viewChildren } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe, DatePipe, CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChatService, Message } from '../../services/chat.service';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'chat',
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    DatePipe,
    CommonModule,
    MatIcon,
    MatButton,
    MatProgressSpinnerModule,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  standalone: true,
})
export class ChatComponent {
  @ViewChild('messageContainer') container!: ElementRef;
  recognition: any;
  chatForm: FormGroup;
  messages: Message[] = [];
  isTyping: boolean = false;
  isListening = false;
  constructor(
    private fb: FormBuilder,
    private chatService: ChatService,
  ) {
    this.chatForm = this.fb.group({
      userMessage: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }
  scrollToBottom() {
    const el = this.container.nativeElement;
    el.scrollTop = el.scrollHeight;
  }
  speechToText() {
    const SpeechRecognition = (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      this.recognition = null;
      window.alert('speech service is not compatible on your browser!');
      return;
    }

    this.isListening = true;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'en-US';
    this.recognition.interimResults = false;
    this.recognition.start();

    const timeout = setTimeout(() => {
      console.log('force stop (no speech)');
      this.isListening = false;

      this.recognition.stop();
    }, 5000);
    this.recognition.onresult = (event: any) => {
      clearTimeout(timeout);

      const transcript = event.results[0][0].transcript;
      console.log('transcript:', transcript);
      this.chatForm.setValue({ userMessage: transcript });
      this.isListening = false;
      this.recognition.stop();
    };
    this.recognition.onspeechend = () => {
      clearTimeout(timeout);
      this.isListening = false;

      this.recognition.stop();
    };

    this.recognition.onerror = () => {
      clearTimeout(timeout);
      this.isListening = false;
      this.recognition.stop();
    };
  }
  submit() {
    let chat: Message = {
      text: this.chatForm.value.userMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    this.messages.push(chat);
    this.isTyping = true;
    this.chatForm.get('userMessage')?.disable();
    this.chatForm.reset();
    setTimeout(() => this.scrollToBottom());
    this.chatService
      .processChatDetails(chat)
      .pipe(debounceTime(2000))
      .subscribe((res) => {
        this.messages.push(res);
        setTimeout(() => this.scrollToBottom());
        this.chatForm.get('userMessage')?.enable();

        this.isTyping = false;
      });
  }
}
