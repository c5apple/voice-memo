$(function () {
  const rec = new webkitSpeechRecognition();
  rec.continuous = false;
  rec.interimResults = false;
  rec.lang = 'ja-JP';

  rec.onresult = e => {
    rec.stop();

    for (var i = e.resultIndex; i < e.results.length; i++) {
      if (!e.results[i].isFinal) continue;

      const { transcript } = e.results[i][0];
      console.log(`Recognised: ${transcript}`);
      $('.line__contents').append(outputUser(transcript));
      $('.line__contents').scrollTop($('.line__contents').get(0).scrollHeight);
    }
  }

  rec.onend = () => { rec.start() };

  rec.start();

  $('.start').on('click', function () {
    rec.start();
  });

  const outputUser = (message) => {
    return `
      <div class="line__right">
        <div class="text" contenteditable>${message}</div>
        <span class="date">${h}:${m}</span>
      </div>
    `;
  }
});