const bcrypt = require("bcryptjs");

//ユーザーの新規登録のリゾルバ
async function signup(parent, args, context) {
  //パスワードの設定
  const password = await bcrypt.hash(args.password, 10);
}
