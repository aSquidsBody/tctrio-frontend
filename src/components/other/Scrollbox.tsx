import React, { Component } from "react";

import { clearSelection } from "../../utils/deselect";

const SCROLLBAR_PADDING = 5; // px
const SCROLLBAR_WIDTH = 21 / 2; // px

const SCROLL_MULTIPLIER = 35 / 246;

interface ScrollboxProps {
  className?: string;
  style?: React.CSSProperties;
}

// NOTES:
// If the component is collapsed in a parent div, then the height calculations
// could get wonky.
// It might be best to give the component a fixed size and then minimizing the
// parent with overflow==false

class ScrollBox extends Component<ScrollboxProps, {}> {
  componentStyle: React.CSSProperties = {
    position: "relative",
    height: "inherit",
    width: "100%",
  };

  // maxHeight
  scrollingRef: React.RefObject<HTMLDivElement>; // element that is scrolled
  scrollBarRef: React.RefObject<HTMLDivElement>; // scrollbar
  scrollHandleRef: React.RefObject<HTMLDivElement>; // scrollbar handle
  scrollableRef: React.RefObject<HTMLDivElement>; // parent of the scrolling element
  state = {
    scrollable: false,
    beginScrolling: false,
    endScrolling: false,
    scrolling: false,
    scrollHover: false,
    scrollY: 0,
    mouseY: 0,
    isNarrow: false,
    scrollBarHeight: 0,
    scrollingHeight: 0, // height of all children added together
    scrollHandleHeight: 0,
    scrollableHeight: 0, // height of the parent scrollable div
    scrollBarRectTop: 0,
  };

  constructor(props: ScrollboxProps) {
    super(props);

    this.scrollingRef = React.createRef();
    this.scrollBarRef = React.createRef();
    this.scrollHandleRef = React.createRef();
    this.scrollableRef = React.createRef();

    if (props.style) {
      this.componentStyle = {
        ...props.style,
      };
      this.componentStyle.position = "relative";
      this.componentStyle.height = this.componentStyle.height || "inherit";
      this.componentStyle.width = this.componentStyle.width || "100%";
    }
  }

  // function is called after first render
  componentDidMount() {
    this.initState(); // determine if the box is scrollable and save some dimensions. Immediately call the componendDidUpate
    this.narrow();
  }

  shouldUpdate() {
    // componentDidUpdate is called whenever there is a setState() invocation.
    // Update if ...
    if (this.state.beginScrolling) {
      this.setState({ beginScrolling: false });
      return true;
    }

    if (this.state.endScrolling) {
      this.setState({ endScrolling: false });
      return true;
    }

    // 1. There is no component
    if (!this.scrollingRef.current || !this.scrollableRef.current) {
      return true;
    }

    // 2. The size of the main component changed
    const scrollable = this.scrollableRef.current;

    if (
      this.state.scrollableHeight !==
      (scrollable.clientHeight || scrollable.offsetHeight)
    ) {
      return true;
    }

    // 3. The content height did change (this.state.scrollingHeight)
    const scrolling = this.scrollingRef.current;
    if (
      this.state.scrollingHeight !==
      (scrolling.clientHeight || scrolling.offsetHeight)
    )
      return true;

    if (this.state.scrollable) {
      // 4. If scrollable and the scrollbar doesn't exist
      if (!this.scrollBarRef.current || !this.scrollHandleRef.current) {
        return true;
      }
      const scrollBar = this.scrollBarRef.current;
      const scrollHandle = this.scrollHandleRef.current;
      // 5. The scrollbar/handle heights did change (this.state.scrollBarHeight)
      if (
        this.state.scrollBarHeight !==
        (scrollBar.clientHeight || scrollBar.offsetHeight)
      )
        return true;
      if (
        this.state.scrollHandleHeight !==
        (scrollHandle.clientHeight || scrollHandle.offsetHeight)
      )
        return true;

      // 6. The component has not been widened
      if (!this.state.isNarrow) {
        return true;
      }
    }

    // Include info on scrolling (like scrollY and such)
    // Should be needed since rerender needs to occur whenever the page styles change
    return false;
  }

  // update when component size changes or after the initial componentDidMount()
  componentDidUpdate() {
    if (!this.props.children) {
      return;
    }

    if (!this.shouldUpdate()) return;

    // init the state again (recalculate the component dimensions)
    this.initState();
    this.initScrollBar();
    this.narrow();
  }

  // initialize the state
  // this function makes no assumption about the scrollability of the component. Rather, it determines it.
  initState = () => {
    if (!this.scrollingRef.current || !this.scrollableRef.current) {
      console.error("Could not render scrollbox");
      return;
    }
    const scrolling = this.scrollingRef.current;
    const scrollableDiv = this.scrollableRef.current;

    // check if the component has more contents than it has space
    const scrollingHeight = scrolling.clientHeight || scrolling.offsetHeight;
    const scrollableHeight =
      scrollableDiv.clientHeight || scrollableDiv.offsetHeight;
    var scrollable = false;

    const scrollBarHeight = scrollableHeight - 10;
    const scrollHandleHeight = Math.floor(
      scrollBarHeight * (scrollableHeight / scrollingHeight)
    );
    if (scrollingHeight > scrollableHeight) {
      scrollable = true;
    }
    if (scrollableHeight <= 0) {
      return;
    }

    this.setState({
      scrollingHeight,
      scrollableHeight,
      scrollable,
      scrollBarHeight,
      scrollHandleHeight,
    });
  };

  // initialize the scrollbar and the handle. This function
  // assumes that scrolling is possible and thus, that the
  // scrollbar & scrollhandle elements exist
  initScrollBar = () => {
    if (!this.scrollHandleRef.current || !this.scrollBarRef.current) {
      console.error("Could not initialize the scroll-bar. Refs do not exist");
      return;
    }

    const scrollBar = this.scrollBarRef.current;
    const scrollHandle = this.scrollHandleRef.current;

    // set the desired scrollhandle height
    const height = this.state.scrollHandleHeight;
    if (height === 0) {
      console.error("Scroll handle height set to 0");
      return;
    }
    scrollHandle.style.height = height.toString() + "px";

    // save the page Y-offset of the scrollbar (needed for mouse scrolling)
    const scrollBarRectTop = scrollBar.getBoundingClientRect().top;

    this.setState({
      scrollBarRectTop,
    });
  };

  // Widen the scrollbox to make room for the handl
  narrow = () => {
    const scrolling = this.scrollingRef.current;
    if (!scrolling || this.state.isNarrow) {
      return;
    }
    if (this.state.scrollable) {
      scrolling.style.width =
        (scrolling.clientWidth - SCROLLBAR_WIDTH).toString() + "px";
      // (scrolling.clientWidth).toString() + "px";
      this.setState({ isNarrow: true });
    }
  };

  // Returns the maximum y-offset that the scroll handle can have before it hits the bottom of the scroll bar
  maxHandleOffset = () => {
    return this.state.scrollBarHeight - this.state.scrollHandleHeight;
  };

  // Return the handle offset (bounded by 0 and the max possible value)
  boundHandleOffset = (offset: number, maxOffset?: number) => {
    maxOffset = maxOffset || this.maxHandleOffset();

    return Math.min(Math.max(0, offset), maxOffset);
  };

  maxScrollingOffset = () => {
    return this.state.scrollingHeight - this.state.scrollableHeight;
  };

  // Return the scrolling offset (bounded by 0 and the max possible offset)
  boundScrollingOffset = (offset: number) => {
    if (!this.state.scrollingHeight || !this.state.scrollableHeight) {
      return;
    }
    const maxOffset = this.maxScrollingOffset();

    return Math.min(Math.max(0, offset), maxOffset);
  };

  // Function to manage scrolling (handle and scrolling element)
  // Input is the pixel difference required for the handle (element is computed)
  scroll = (handleDiff: number) => {
    if (
      !this.scrollHandleRef.current ||
      !this.scrollingRef.current ||
      !this.state.scrollingHeight ||
      !this.state.scrollableHeight
    ) {
      return;
    }
    const scrollHandle = this.scrollHandleRef.current;
    const scrolling = this.scrollingRef.current;

    // maximum value that the top offset can be for the handle
    const maxOffset = this.maxHandleOffset();

    // scrollHandle Y (w.r.t scrollBar)
    const scrollY = this.state.scrollY;
    if (scrollY >= 0 && scrollY <= maxOffset) {
      // mouseDiff will also be the difference for scroll
      // define the new top offset for the handle
      const newTopHandle = this.boundHandleOffset(
        this.state.scrollY + handleDiff,
        maxOffset
      );

      // move the handle of the scrollbar
      scrollHandle.style.top = newTopHandle.toString() + "px";

      // define the new offset for the scrolling element
      const divY = -this.boundScrollingOffset(
        (newTopHandle / this.maxHandleOffset()) * this.maxScrollingOffset()
      )!;

      // move the scrolling element
      scrolling.style.top = divY.toString() + "px";

      // save the new scrollhandle y position
      this.setState({ scrollY: newTopHandle });
    }
  };

  // handles mouse scroll event
  scrollWheel = (e: React.WheelEvent) => {
    // delta "scrolling offset"
    const diff = SCROLL_MULTIPLIER * e.deltaY;

    this.scroll(diff);
  };

  // handle a click on the scrollbar (not the handle)
  selectScrollBar = (e: React.MouseEvent) => {
    if (
      this.state.scrollHover ||
      !this.scrollBarRef.current ||
      !this.state.scrollHandleHeight ||
      !this.scrollHandleRef.current
    ) {
      return;
    }
    const scrollBar = this.scrollBarRef.current as HTMLElement;
    const barRect = scrollBar.getBoundingClientRect();
    const scrollHandle = this.scrollHandleRef.current;

    // newOffset is the mouse position (w.r.t scrollbar) minus half
    // of the handle
    const newOffset =
      e.clientY - barRect.top - 0.5 * this.state.scrollHandleHeight;
    const diff = newOffset - scrollHandle.offsetTop;

    this.scroll(diff);
    this.selectScrollHandle(e);
  };

  // handle a click on the scrollHandle
  selectScrollHandle = (e: React.MouseEvent) => {
    if (!this.scrollHandleRef.current || !this.scrollBarRef.current) {
      return;
    }
    const scrollHandle = this.scrollHandleRef.current;

    // Mouse Y (w.r.t scrollBar)
    const mouseY = e.clientY - this.state.scrollBarRectTop;

    // ScrollHandle Y (w.r.t to scrollBar)
    const scrollY = scrollHandle.offsetTop;

    document.onmousemove = this.moveScrollHandle;
    document.onmouseup = this.deselectScrollHandle;
    this.setState({ scrolling: true, mouseY, scrollY, beginScrolling: true });
  };

  deselectScrollHandle = () => {
    document.onmousemove = null;
    document.onmouseup = null;
    clearSelection(); // having weird text selection issues
    this.setState({ scrolling: false, endScrolling: true });
  };

  moveScrollHandle = (e: MouseEvent) => {
    // have to pass barTop (for some reason, the bounding rectangle
    // changes over time).
    // include barHeight and handleHeight because why not
    if (!this.scrollHandleRef.current || !this.scrollingRef.current) {
      return;
    }

    const barTop = this.state.scrollBarRectTop;
    const barHeight = this.state.scrollBarHeight;

    // Mouse Y (w.r.t scrollBar)
    const mouseY = e.clientY - barTop;
    if (mouseY >= 0 && mouseY <= barHeight) {
      const mouseDiff = mouseY - this.state.mouseY;

      this.scroll(mouseDiff);
      this.setState({ mouseY });
    }
  };

  scrollHover = () => this.setState({ scrollHover: true });
  notScrollHover = () => this.setState({ scrollHover: false });

  scrollableDiv: React.CSSProperties = {
    position: "relative",
    height: "100%",
    width: "100%",
    maxHeight: "inherit",
    overflow: "hidden",
  };

  scrollBar = (): React.CSSProperties => {
    return {
      position: "absolute",
      height: `calc(100% - ${2 * SCROLLBAR_PADDING}px)`,
      width: this.state.scrollable ? SCROLLBAR_WIDTH + "px" : "0px",
      visibility: this.state.scrollable ? "visible" : "collapse",
      background: "#353535",
      top: "5px",
      right: `calc(1px)`,
      borderRadius: "50px",
      zIndex: 1,
    };
  };

  scrollHandle = (): React.CSSProperties => {
    const height =
      this.state.scrollHandleHeight >= 0
        ? `${this.state.scrollHandleHeight}px`
        : "50%";

    return {
      position: "relative",
      height: height,
      width: SCROLLBAR_WIDTH + 5 + "px",
      top: "0px",
      right: "2.5px",
      zIndex: 2,
    };
  };

  innerScrollHandle = (): React.CSSProperties => {
    return {
      margin: "0px auto",
      height: "100%",
      width: SCROLLBAR_WIDTH + "px",
      background:
        this.state.scrollHover || this.state.scrolling ? "#777" : "#555",
      borderRadius: "5px",
      transition: "background 0.1s ease-in",
    };
  };

  scrollingDiv: React.CSSProperties = {
    position: "relative",
    top: "0px",
    left: "0px",
    width: "100%",
    // height: "100%,",
    overflow: "hidden",
  };

  spotifySongDiv: React.CSSProperties = {};

  render() {
    return (
      <div style={this.componentStyle} className={this.props.className}>
        <div
          onWheel={this.scrollWheel}
          style={this.scrollableDiv}
          ref={this.scrollableRef}
        >
          <div
            style={this.scrollBar()}
            ref={this.scrollBarRef}
            onMouseDown={this.selectScrollBar}
          >
            <div
              style={this.scrollHandle()}
              onMouseDown={this.selectScrollHandle}
              onMouseEnter={this.scrollHover}
              onMouseLeave={this.notScrollHover}
              ref={this.scrollHandleRef}
            >
              <div style={this.innerScrollHandle()}></div>
            </div>
          </div>
          <div
            className={this.state.scrolling ? "noSelect" : ""}
            style={this.scrollingDiv}
            ref={this.scrollingRef}
          >
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export default ScrollBox;
