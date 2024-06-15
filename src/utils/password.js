import bcrypt from 'bcrypt';

const SALT_ROUNDS = process.env.saltRounds || 10;

export async function hash(pwd) {
  const salt = await bcrypt
    .genSalt(SALT_ROUNDS)
    .catch((err) => console.log(err));

  const password = await bcrypt
    .hash(pwd, salt)
    .catch((err) => console.log(err));

  return { password, salt };
}

export async function compare(pwd, hashedPwd) {
  const isMatch = await bcrypt
    .compare(pwd, hashedPwd)
    .catch((err) => console.log(err));

  return isMatch;
}
