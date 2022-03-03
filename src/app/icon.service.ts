import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

// Add all svg icons
export enum Icons {
  Views = 'eye_views', 
  Caret_down = 'caret_down',
  Agenda = 'agenda',
  Feed = 'feed',
  Event = 'event',
  People = 'people',
  Profile_img = 'empty_profile_img',
  Calendar = 'calendar',
  Bookmark = 'bookmark',
  Notification = 'notification',
  Envelope = 'envelope',
  Hand = 'hand',
  Cog = 'cog',
  Message_bubble = 'message_bubble',
  Caret_right = 'caret_right',
  Hamburger = 'hamburger',
  Email16x13 = 'email16x13',
  Key = 'key',
  SignIn = 'signin',
  Facebook = 'facebook',
  Twitter = 'twitter',
  Linkedin = 'linkedin',
  Instagram = 'instagram',
  Messenger = 'messenger',
  Home = 'home',
  TimeGray = 'timeGray',
  Document = 'Document',
  Handouts = 'handouts',
  Bin = 'bin',
  Edit = 'edit',
  Video = 'Video',
  userPhoto = 'userPhoto',
  Logout = 'logout',
  LiveVideo = 'live_video',
  LivePlay = 'live_play',
  Heart = 'heart',
  User = 'user',
  Users = 'users',
  Events = 'events',
  Send_Question = 'send_question',
  Share = 'share',
  Email = 'email',
  Phone = 'phone',
  Numbers = 'numbers',
  Info = 'info',
  Google_Calendar = 'google_calendar',
  Outlook = 'outlook',
  Msword='msword',
  PowerPoint='powerpoint',
  Yahoo = 'yahoo',
  Lock_Opened = 'lock_opened',
  Unpin = 'unpin',
  Business = 'business',
  Work = 'work',
  Pending_Person = 'pending_person',
  InstagramC = 'instagram-c',
  Abysmal = 'abysmal',
  Sad = 'sad',
  Neutral = 'neutral',
  Happy = 'happy',
  Ecstatic = 'ecstatic',
  Badge = 'badge'
}

@Injectable({
  providedIn: 'root'
})
export class IconService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) { }

  // Init icons
  public registerIcons(): void {
    this.loadIcons(Object.values(Icons), '../assets/svg/icons');
  }

  private loadIcons(iconKeys: string[], iconUrl: string): void {
    iconKeys.forEach(key => {
      this.matIconRegistry.addSvgIcon(key, this.domSanitizer.bypassSecurityTrustResourceUrl(`${iconUrl}/${key}.svg`));
    });
  }
}
