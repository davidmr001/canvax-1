import { SHAPES } from '../../const';

export default class CanvasGraphicsRenderer
{
   
    constructor(renderer)
    {
        this.renderer = renderer;
    }
    
     /**
     * @param displayObject
     * @stage 也可以displayObject.getStage()获取。
     */
    render(displayObject , stage)
    {

        const graphics = displayObject.graphics;
        const renderer = this.renderer;
        const ctx = stage.ctx;
        const context = displayObject.context;

        if( displayObject.parent ){
            context.globalAlpha *= displayObject.parent.context.globalAlpha;
        };

        for (let i = 0; i < graphics.graphicsData.length; i++)
        {
            const data = graphics.graphicsData[i];
            const shape = data.shape;

            const fillStyle = data.fillStyle;
            const strokeStyle = data.strokeStyle;

            ctx.lineWidth = data.lineWidth;

            if (data.type === SHAPES.POLY)
            {
                ctx.beginPath();

                this.renderPolygon(shape.points, shape.closed, ctx);

                if (data.hasFill())
                {
                    ctx.globalAlpha = data.fillAlpha;
                    ctx.fillStyle = fillStyle;
                    ctx.fill();
                }
                if (data.hasLine())
                {
                    ctx.globalAlpha = data.lineAlpha;
                    ctx.strokeStyle = strokeStyle;
                    ctx.stroke();
                }
            }
            else if (data.type === SHAPES.RECT)
            {
                if ( data.hasFill() )
                {
                    ctx.globalAlpha = data.fillAlpha;
                    ctx.fillStyle = fillStyle;
                    ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
                }
                if (data.hasLine())
                {
                    ctx.globalAlpha = data.lineAlpha;
                    ctx.strokeStyle = strokeStyle;
                    ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
                }
            }
            else if (data.type === SHAPES.CIRC)
            {

                // TODO - need to be Undefined!
                ctx.beginPath();
                ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
                ctx.closePath();

                if (data.hasFill())
                {
                    ctx.globalAlpha = data.fillAlpha;
                    ctx.fillStyle = fillStyle;
                    ctx.fill();
                }
                if (data.hasLine())
                {
                    ctx.globalAlpha = data.lineAlpha;
                    ctx.strokeStyle = strokeStyle;
                    ctx.stroke();
                }
            }
            else if (data.type === SHAPES.ELIP)
            {
                const w = shape.width * 2;
                const h = shape.height * 2;

                const x = shape.x - (w / 2);
                const y = shape.y - (h / 2);

                ctx.beginPath();

                const kappa = 0.5522848;
                const ox = (w / 2) * kappa; // control point offset horizontal
                const oy = (h / 2) * kappa; // control point offset vertical
                const xe = x + w;           // x-end
                const ye = y + h;           // y-end
                const xm = x + (w / 2);       // x-middle
                const ym = y + (h / 2);       // y-middle

                ctx.moveTo(x, ym);
                ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
                ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
                ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
                ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);

                ctx.closePath();

                if (data.hasFill())
                {
                    ctx.globalAlpha = data.fillAlpha;
                    ctx.fillStyle = fillStyle;
                    ctx.fill();
                }
                if (data.hasLine())
                {
                    ctx.globalAlpha = data.lineAlpha;
                    ctx.strokeStyle = strokeStyle;
                    ctx.stroke();
                }
            }
        }
    }

    renderPolygon(points, close, ctx)
    {
        ctx.moveTo(points[0], points[1]);

        for (let j = 1; j < points.length / 2; ++j)
        {
            ctx.lineTo(points[j * 2], points[(j * 2) + 1]);
        }

        if (close)
        {
            ctx.closePath();
        }
    }

}