import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/homePage/HighlightText";
import CTAButton from "../components/core/homePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/homePage/CodeBlocks";
import TimeLineSection from "../components/core/homePage/TimeLineSection";
import LearningLanguageSection from "../components/core/homePage/LearningLanguageSection";
import InstructorSection from "../components/core/homePage/InstructorSection";
import ExploreMore from "../components/core/homePage/ExploreMore";
import Footer from "../components/common/Footer";
import ReviewSlider from "../components/common/ReviewSlider";
const Home = () => {
  return (
    <div className="">
      {/* section1 */}
      <div className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center text-white justify-between">
        <Link to={"/signup"}>
          <div className="group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95 w-fit shadow-richblack-5 shadow-sm">
            <div className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>

        <div className="text-center text-4xl font-semibold mt-7">
          Empower Your Future with
          <HighlightText text={"Coding Skills"} />
        </div>

        <div className="w-[80%] text-center text-base font-bold text-richblack-300 mt-4">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </div>

        <div className="flex flex-row gap-7 mt-8">
          <CTAButton active={true} linkTo={"/signup"}>
            Learn more
          </CTAButton>
          <CTAButton active={false} linkTo={"/login"}>
            Book a Demo
          </CTAButton>
        </div>

        <div
          className="w-[70%] mx-auto my-14 shadow-lg"
          style={{ boxShadow: "15px 15px white" }}
        >
          <video muted loop autoPlay>
            <source src={Banner} type="video/mp4" />
          </video>
        </div>

        {/* code section 1 */}
        <div className="w-[90%]">
          <CodeBlocks
            position={"lg:flex-row"}
            heading={
              <div className="text-4xl font-semibold">
                Unlock your
                <HighlightText text={"coding potential"} /> with our online
                courses
              </div>
            }
            subheading={
              "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            }
            ctnbtn1={{
              btnText: "Try it yourself",
              linkTo: "/signup",
              active: true,
            }}
            ctnbtn2={{
              btnText: "Learn more",
              linkTo: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock1 absolute"></div>}
          />
        </div>

        {/* code section 2 */}
        <div className="w-[90%]">
          <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
              <div className="w-[40%] text-4xl font-semibold">
                Start
                <HighlightText text={"coding in seconds"} />
              </div>
            }
            subheading={
              "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctnbtn1={{
              btnText: "Continue Lesson",
              linkTo: "/signup",
              active: true,
            }}
            ctnbtn2={{
              btnText: "Learn more",
              linkTo: "/login",
              active: false,
            }}
            codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\nbody>\nh1><ahref="/">Header</a>/h1>\nnav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n/nav>`}
            codeColor={"text-yellow-25"}
            backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
        </div>

        <ExploreMore />
      </div>

      {/* section2 */}
      <div className="bg-pure-greys-5 text-richblack-700 mt-16">
        <div className="homepage_bg h-[300px] pt-10">
          <div className="w-11/12 max-w-maxContent flex justify-center items-center gap-5 mx-auto">
            <div className="flex flex-row gap-7 text-white mt-28">
              <CTAButton active={true} linkTo={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkTo={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="mx-auto w-11/12 max-w-maxContent flex flex-col gap-7 items-center justify-between mt-16">
          <div className="flex flex-row gap-5 justify-center">
            <div className="text-4xl font-semibold w-[45%]">
              Get the Skills you need for a
              <HighlightText text={"Job that is in demand"} />
            </div>

            <div className="flex flex-col gap-10 w-[40%] items-start">
              <div className="text-base">
                The modern StudyNotion is the dictates its own terms. Today, to
                be a competitive specialist requires more than professional
                skills.
              </div>
              <CTAButton active={true} linkTo={"/signup"}>
                <div>Learn more</div>
              </CTAButton>
            </div>
          </div>

          <TimeLineSection />

          <LearningLanguageSection />
        </div>
      </div>
      {/* section3 */}

      <div className="w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white">
        <InstructorSection />

        <h2 className="text-center text-4xl font-semibold mt-10">
          Review from Other Learners
        </h2>

        <ReviewSlider/>
      </div>
      {/* section4 Footer */}

      <Footer />
    </div>
  );
};

export default Home;
