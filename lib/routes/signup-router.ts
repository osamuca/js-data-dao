import { AppConfig } from '../config/app-config'
import { Request, Response, Router, NextFunction } from 'express'
import { SignupController } from '../controllers'
import { BaseRouter } from './base-router'
import * as JSData from 'js-data'
import * as nodemailer from 'nodemailer'

export class SignupRouter extends BaseRouter {
  controller: SignupController
  store: JSData.DataStore
  router: Router

  constructor ( store: JSData.DataStore, appConfig: AppConfig, transporter?: nodemailer.Transporter ) {
    super()
    this.controller = new SignupController( store, appConfig, transporter )
    this.store = store
    this.router = Router()
    this.routers()
  }

  public routers () {
    let ctrl = this
    this.router.get( '/:token', ( req: Request, res: Response, next: NextFunction ) =>
      this.respond( ctrl.controller.validaToken( req, res, next ), res ) )

    this.router.post( '/:token', ( req: Request, res: Response, next: NextFunction ) =>
      this.respond( ctrl.controller.registerPassword( req, res, next ), res ) )
  }

  public getRouter (): Router {
    return this.router
  }
}
