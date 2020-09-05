import { GET, Path } from 'typescript-rest'
import { execSync } from 'child_process'
import { Tags, Response } from 'typescript-rest-swagger'

@Tags('System')
@Path('/system')
export class SysInfoService {
  hash: string
  versionName: string

  constructor() {
    this.hash = execSync('git rev-parse HEAD')
      .toString('utf-8')
      .replace(/\n/, '')
    this.versionName = execSync('git describe --tags --abbrev=0')
      .toString('utf-8')
      .replace(/\n/, '')
  }

  @GET
  @Response<{ hash: string; versionName: string }>(200, '現在')
  @Path('/')
  systemInfo() {
    return {
      hash: this.hash,
      versionName: this.versionName
    }
  }
}
