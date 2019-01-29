import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { AvatarPipe } from './avatar/avatar';
import { GetTagsPipe } from './get-tags/get-tags';
@NgModule({
	declarations: [ThumbnailPipe,
    AvatarPipe,
    AvatarPipe,
    GetTagsPipe],
	imports: [],
	exports: [ThumbnailPipe,
    AvatarPipe,
    AvatarPipe,
    GetTagsPipe]
})
export class PipesModule {}
