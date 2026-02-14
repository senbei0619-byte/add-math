// ゲームの状態管理
let numA = 0;
let numB = 0;
let correctCount = 0;
let totalCount = 0;
let selectedAnswer = '';


// DOM要素の取得
const numberAEl = document.getElementById('number-a');
const numberBEl = document.getElementById('number-b');
const answerMarkEl = document.getElementById('answer-mark');
const dotsAEl = document.getElementById('dots-a');
const dotsBEl = document.getElementById('dots-b');
const numberButtons = document.querySelectorAll('.number-btn');
const nextBtn = document.getElementById('next-btn');
const feedbackEl = document.getElementById('feedback');
const correctCountEl = document.getElementById('correct-count');
const totalCountEl = document.getElementById('total-count');

// 視覚的なドットを生成
function createDots(container, count, isAnswer = false) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = isAnswer ? 'dot answer' : 'dot';
        dot.style.animationDelay = `${i * 0.05}s`;
        container.appendChild(dot);
    }
}

// 新しい問題を生成（A+B=？）
function generateNewQuestion() {
    // 1〜9のランダムな数字を生成
    numA = Math.floor(Math.random() * 9) + 1;
    numB = Math.floor(Math.random() * 9) + 1;
    numberAEl.textContent = numA;
    numberBEl.textContent = numB;
    answerMarkEl.textContent = '?';

    // 視覚的なドットを表示
    createDots(dotsAEl, numA, false);
    createDots(dotsBEl, numB, false);

    // 選択をリセット
    selectedAnswer = '';
    answerMarkEl.textContent = '?';
    numberButtons.forEach(btn => {
        btn.classList.remove('selected');
        btn.disabled = false;
    });

    // ボタンの表示切り替え
    feedbackEl.classList.add('hidden');
}

// 答えをチェック
function checkAnswer() {
    if (selectedAnswer === null) {
        return;
    }
    
    const correctAnswer = numA + numB;
    
    // 問題数をカウント
    totalCount++;
    totalCountEl.textContent = totalCount;
    
    // 答えの判定
    if (selectedAnswer === correctAnswer) {
        // 正解の場合
        correctCount++;
        correctCountEl.textContent = correctCount;

        feedbackEl.textContent = `🎉 せいかい！ ${numA} + ${numB} = ${correctAnswer} だね！`;
        feedbackEl.className = 'feedback correct';

        // 効果音（ブラウザのビープ音）
        playSuccessSound();
    } else {
        // 不正解の場合
        feedbackEl.textContent = `😢 ざんねん... こたえは ${correctAnswer} だよ。${numA} + ${numB} = ${correctAnswer}`;
        feedbackEl.className = 'feedback incorrect';
    }
    
    // フィードバックを表示
    feedbackEl.classList.remove('hidden');
    
    // ボタンを無効化
    numberButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    // 5秒後に自動で次の問題へ
    setTimeout(() => {
        generateNewQuestion();
    },2500);
}

// 成功音を再生（簡易版）
function playSuccessSound() {
    // Web Audio APIを使った簡易的な効果音
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 523.25; // C5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // 音が再生できなくても問題なし
        console.log('効果音を再生できませんでした');
    }
}

// イベントリスナーの設定

// 数字ボタンのクリックイベント
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.disabled) return;
        
        const num = btn.dataset.number;
        
        // もし num が undefined（消すボタンなど）だったら、ここで処理を終了する
        if (!num || num === 'ok') return; 

        if (selectedAnswer.toString().length < 2) {
            selectedAnswer += num;
            answerMarkEl.textContent = selectedAnswer;
        }
    });
});
// 一文字消す関数の修正版
function deleteLastChar() {
    // 1. 今、画面に表示されている文字を直接取ってくる
    let currentText = answerMarkEl.textContent;

    // 2. 「?」だったり、空っぽだったら何もしない
    if (currentText === "?" || currentText === "") {
        selectedAnswer = ""; // 変数もリセット
        return;
    }

    // 3. 1文字削る
    let newText = currentText.slice(0, -1);

    // 4. 削った結果、空になったら「?」に戻す。そうでなければ削った文字を出す
    if (newText === "") {
        answerMarkEl.textContent = "?";
        selectedAnswer = "";
    } else {
        answerMarkEl.textContent = newText;
        selectedAnswer = newText; // 変数も同期させる
    }
}
// 「こたえる」ボタンで答えを確定
const answerBtn = document.getElementById('answer-btn');
if (answerBtn) {
    answerBtn.addEventListener('click', () => {
        if (selectedAnswer !== '') {
            selectedAnswer = parseInt(selectedAnswer);
            checkAnswer();
        }
    });
}



// ページ読み込み時に最初の問題を生成
window.addEventListener('DOMContentLoaded', () => {
    generateNewQuestion();
});
