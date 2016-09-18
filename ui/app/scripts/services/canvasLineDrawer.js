'use strict';

angular.module('twsUI.services').factory('canvasLineDrawer',
    [
        function () {
            return {
                drawLine: function (context, startCell, endCell, cellHeight, cellWidth, color) {
                    var halfWidth = cellWidth / 2;
                    var halfHeight = cellHeight / 2;
                    var startX = (startCell.column * cellWidth) + halfWidth;
                    var startY = (startCell.row * cellHeight) + halfHeight;
                    var endX = ((endCell.column - startCell.column) * cellWidth) + startX;
                    var endY = ((endCell.row - startCell.row) * cellHeight) + startY;
                    context.lineWidth = (halfHeight + halfWidth) / 2;
                    context.strokeStyle = color;
                    context.lineCap = 'round';
                    context.moveTo(startX, startY);
                    context.lineTo(endX, endY);
                    context.stroke();
                }
            };
        }
    ]
);
