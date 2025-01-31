const WordPressIcon = ({ width = 64, height = 64, fill = 'currentColor' }: { width?: number, height?: number, fill?: string }) => (
    <svg
        version="1.0"
        id="katman_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 600 450"
        style={{ backgroundAttachment: "new 0 0 600 450" }}
        xmlSpace="preserve"
        width={width}
        height={height}
    >
        <symbol id="icon-wordpress" viewBox="-8 -8 16 16">
            <path
                d="M-6,0c0,2.3,1.4,4.3,3.4,5.3l-2.9-7.6C-5.8-1.7-6-0.8-6,0z M4.1-0.3c0-0.7-0.3-1.2-0.5-1.6
		C3.3-2.4,3-2.8,3-3.3c0-0.5,0.4-1,1-1c0,0,0.1,0,0.1,0C3-5.3,1.6-5.8,0-5.8c-2.1,0-3.9,1-5,2.6c0.1,0,0.3,0,0.4,0
		C-4-3.2-3-3.3-3-3.3c0.3,0,0.4,0.4,0,0.5c0,0-0.3,0-0.7,0.1l2.2,6.3l1.3-3.8l-0.9-2.5c-0.3,0-0.6-0.1-0.6-0.1c-0.3,0-0.3-0.5,0-0.5
		c0,0,1,0.1,1.6,0.1c0.6,0,1.6-0.1,1.6-0.1c0.3,0,0.4,0.4,0,0.5c0,0-0.3,0-0.7,0.1L3,3.5l0.6-1.9C3.9,0.8,4,0.2,4.1-0.3L4.1-0.3z
		 M0.1,0.5l-1.8,5.1C-1.2,5.8-0.6,5.8,0,5.8c0.7,0,1.4-0.1,2-0.3c0,0,0-0.1,0-0.1C1.9,5.4,0.1,0.5,0.1,0.5z M5.3-2.8
		c0,0.2,0,0.4,0,0.6c0,0.6-0.1,1.3-0.5,2.1L3,5C4.8,4,6,2.2,6,0C6-1,5.7-2,5.3-2.8L5.3-2.8z M0-8c-4.4,0-8,3.6-8,8s3.6,8,8,8
		s8-3.6,8-8S4.4-8,0-8z M0,7c-3.9,0-7-3.1-7-7s3.1-7,7-7s7,3.1,7,7S3.9,7,0,7z"
                fill={fill}
            />
        </symbol>
        <use
            xlinkHref="#icon-wordpress"
            width="16"
            height="16"
            x="-8"
            y="-8"
            transform="matrix(21.1495 0 0 21.1495 300 225)"
            style={{ overflow: "visible" }}
        />
    </svg>
);

export default WordPressIcon;
