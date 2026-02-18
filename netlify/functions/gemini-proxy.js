// Gemini APIへのリクエストを中継するサーバーレス関数
exports.handler = async (event, context) => {
  // パスワードチェック
  const password = event.headers['x-password'];
  const CORRECT_PASSWORD = process.env.APP_PASSWORD || 'hadashiru2025';
  
  if (password !== CORRECT_PASSWORD) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'パスワードが正しくありません' })
    };
  }

  // Gemini APIキー（Netlify環境変数から取得）
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'APIキーが設定されていません' })
    };
  }

  // リクエストボディを取得
  const requestBody = JSON.parse(event.body);

  try {
    // Gemini APIへリクエスト
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      }
    );

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
