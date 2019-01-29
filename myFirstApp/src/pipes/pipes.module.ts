import { NgModule } from '@angular/core';
import { ThumbnailPipe } from './thumbnail/thumbnail';
import { AvatarPipe } from './avatar/avatar';
@NgModule({
	declarations: [ThumbnailPipe,
    AvatarPipe,
    AvatarPipe],
	imports: [],
	exports: [ThumbnailPipe,
    AvatarPipe,
    AvatarPipe]
})
export class PipesModule {}
