const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const bcript = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')


const User = require('../models/User')

const router = Router()



router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    console.log(req.body, 'is a password and email');
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации"
        })
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email })

      if (candidate) {
        return res.status(400).json({ message: "Такой пользователь уже существует" })
        // если {candidate === true} то выводим сообщение об совпадении и с помощью return,
        // завершаем выполнение функции
      }
      const hashedPassword = await bcript.hash(password, 12)
      const user = new User({ email, password: hashedPassword })

      await user.save()

      res.status(201).json({ message: "Пользователь создан" })

    } catch (error) {
      res.status(500).json({ message: 'Что то пошло не так' })// 500 серверная ошибка
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Введите корректный Email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации"
        })
      }
      const { email, password } = req.body

      const user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" })
      }

      const isMatch = await bcript.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Неверный пароль' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        //{ expiresIn: '1h' } //окончание существование токена
      )

      res.json({ token, userId: user.id })

    } catch (error) {
      res.status(500).json({ message: 'что то пошло не так' })// 500 серверная ошибка
    }
  }
)
module.exports = router