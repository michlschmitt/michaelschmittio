/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-loop-func */

// import node_modules
import striptags from 'striptags';

// import types
import { FixMeLater } from '../../types';

// define type
interface IframeType extends Element {
  allow?: string;
  allowfullscreen?: boolean;
  contentWindow?: FixMeLater;
  frameborder?: string;
  height?: string;
  src?: string;
  title?: string;
  width?: string;
}

// define modules
export function getYoutubeId({ youtubeUrl }: { youtubeUrl: string }): string | boolean {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = youtubeUrl.match(regExp);
  return match && match[7].length === 11 ? match[7] : false;
}

export function pauseVideos(): void {
  // get iframe elements and show user cookie information
  const iframes = document.getElementsByTagName('IFRAME');

  // loop over iframes and pause
  for (let i = 0; i < iframes.length; i += 1) {
    const iframe: IframeType = iframes[i];

    // check element
    if (iframe) {
      // create stop command
      const stopCommand = JSON.stringify({
        event: 'command',
        func: 'pauseVideo',
      });

      // pause video
      iframe?.contentWindow?.postMessage(stopCommand, '*');
    }
  }
}

// optin service for third party embeds
export function iframeOptin({ autoplay }: { autoplay: boolean }): void {
  // get iframe elements and show user cookie information
  const iframes = document.getElementsByTagName('IFRAME');
  for (let i = 0; i < iframes.length; i += 1) {
    const iframe: IframeType = iframes[i];

    // check youtube embed
    if (iframe?.src?.includes('youtube')) {
      // get meta data from iframe
      const title = iframe?.title ? striptags(iframe?.title) : 'Storyliner';
      const youtubeId = getYoutubeId({ youtubeUrl: iframe?.src });

      // get info text
      const infoText =
        'When you load the video, you agree that your data will be transmitted to Youtube. You can find further information in our <a href="https://www.michaelschmitt.io/privacy-policy/">Privacy Policy</a>.';
      const buttonText = 'Load YouTube Video';

      // create optin canvas
      const optinWrapper = document.createElement('DIV');
      optinWrapper.className = 'iframe-wrapper';
      optinWrapper.innerHTML = `<div class="optin-canvas" id="optin-canvas" data-youtube-id="${youtubeId}" data-title="${title}"><div class="icon-wrapper"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M19.606 6.995c-.076-.298-.292-.523-.539-.592C18.63 6.28 16.5 6 12 6s-6.628.28-7.069.403c-.244.068-.46.293-.537.592C4.285 7.419 4 9.196 4 12s.285 4.58.394 5.006c.076.297.292.522.538.59C5.372 17.72 7.5 18 12 18s6.629-.28 7.069-.403c.244-.068.46-.293.537-.592C19.715 16.581 20 14.8 20 12s-.285-4.58-.394-5.005zm1.937-.497C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5v-7l6 3.5-6 3.5z"/></svg></div><div class="info-text">${infoText}</div><div class="button-wrapper"><button class="optin-button" type="text" id="optin-button">${buttonText}</button></div></div>`;

      // create optin handler
      const optin = () => {
        // because of build
        if (typeof window === 'undefined') return;

        // create new iframe
        localStorage.setItem('youtube-optin', 'true');

        // get canvas
        const iframeContainer = document.getElementsByClassName('iframe-wrapper')[0];
        const optinCanvas = document.getElementById('optin-canvas');

        // create new iframe
        const newIframe: IframeType = document.createElement('IFRAME');
        newIframe.src = `https://www.youtube-nocookie.com/embed/${optinCanvas?.getAttribute(
          'data-youtube-id',
        )}?version=3&enablejsapi=1&&autoplay=${autoplay ? 1 : 0}`;
        newIframe.title = optinCanvas?.getAttribute('data-title') || '';
        newIframe.width = iframeContainer?.clientWidth
          ? `${iframeContainer.clientWidth}px`
          : '680px';
        newIframe.height = iframeContainer?.clientHeight
          ? `${iframeContainer.clientHeight}px`
          : '440px';
        newIframe.frameborder = '0';
        newIframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
        newIframe.allowfullscreen = true;

        // replace iframe with canvas
        optinCanvas?.parentNode?.replaceChild(newIframe, optinCanvas);
      };

      // replace iframe with canvas
      iframe?.parentNode?.replaceChild(optinWrapper, iframes[i]);

      // attach event handler
      const optinButton = document.getElementById('optin-button');
      if (optinButton) {
        optinButton.onclick = optin;
      }

      // check if already opted in
      if (localStorage.getItem('youtube-optin')) {
        optin();
      }
    }
  }
}
