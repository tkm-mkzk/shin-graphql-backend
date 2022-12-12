const jwt = require("jsonwebtoken");

APP_SECRET = "GraphQL-is-aw3some";

//トークンを複合するための関数
function getTokenPayload(token) {
  //トークン化された物の前の情報(user.id)を複合する。
  return jwt.verify(token, APP_SECRET);
}

//ユーザーIDを取得するための関数
function getUserId(req, authToken) {
  if (req) {
    //ヘッダーから認証権限があるかを確認する。
    const authHeader = req.headers.authorization;
    //権限があるなら
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("トークンが見つかりませんでした");
      }
      //そのトークンを複合する
      const { userId } = getTokenPayload(token);
      return userId;
    }
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
    return userId;
  }

  throw new error("認証権限がありません");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
