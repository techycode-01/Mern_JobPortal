import React, { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [job, setJob] = useState([]);
  useEffect(() => {
    fetch(`https://mern-jobportal-ckfs.onrender.com/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);

  const handleJobApply = async () => {
    // console.log("btn clicked")
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "CV or Resume URL address",
      inputPlaceholder: "Enter the URL",
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire("Appliction Submited Successfully!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Changes are not saved", "", "info");
        }
      });
    }
  };
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Job Details Page"} path={"Single Job"} />

      <div className="mt-10">
        <h3 className="font-semibold mb-2">Job ID: {parseInt(id)}</h3>

        <div className="my-4">
          <h2 className="text-2xl font-medium text-blue">Job details</h2>
          <p className="text-primary/75 md:w-1/3 text-sm italic my-1">
            Here<span>&apos;</span>s how the job details align with your job
            preferences. Manage job preferences anytime in your profile.
          </p>
        </div>

        <div className="my-4 space-y-2">
          <div className="flex items-center gap-2">
            <FaBriefcase />
            <p className="text-xl font-medium mb-2">
              Job type :
              <span className=" ml-2 text-gray-700 ">
                {job.employmentType}
              </span>
            </p>
          </div>
          <button className="bg-blue px-6 py-1 text-white rounded-sm">
            {job.jobTitle}
          </button>
          <button
            className="bg-indigo-700 px-6 py-1  text-white rounded-sm ms-2"
            onClick={handleJobApply}
          >
            Apply Now
          </button>
        </div>

        {/* job details */}
        <div className="flex flex-col md:flex-row justify-between gap-12 mt-12">
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Benefits</h4>
            <p className="text-sm text-primary/70 mb-2">
              Pulled from the full job description
            </p>
            <ul className="list-disc list-outside text-primary/90 space-y-2 text-base">
              <li>
                1. ${job.minPrice}-{job.maxPrice}k
              </li>
              <li>2. Disability insurance</li>
              <li>3. Employee discount</li>
              <li>4. Flexible spending account</li>
              <li>5. Health insurance</li>
              <li>6. Paid time off</li>
              <li>7. Vision insurance</li>
              <li>8. Volunteer time off</li>
              <li> 9. Dental insurance</li>
            </ul>
          </div>

          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">OutLine</h4>
            <p className="text-primary/90">
              Grand Canyon Education (GCE) is a rapidly growing educational
              service company that has long been an industry leader in providing
              educational, operational and technological support services to the
              post-secondary education sector. We put people first, drive
              innovation, and do good in the community that we live and work in.
              <br /> <br />
              This position entails joining a web design and development team
              called Academic Web Services within Grand Canyon Education to
              build custom web apps. Academic Web Services is a close-knit team
              that constructs and maintains a wide variety of applications using
              the latest web technologies.
            </p>
          </div>
          <div className="md:w-1/3">
            <h4 className="text-lg font-medium mb-3">Future Growth</h4>
            <p className="text-primary/90">
              An industry leader in providing educational, operational and
              technological support services to the post-secondary education
              sector. We put people first, drive innovation, and do good in the
              community that we live and work in.
              <br />
              <br />
              We’re passionate about web design and development and are focused
              on delivering quality products to our customers in a team setting
              driven by strong culture and a good working atmosphere. We are
              hiring web developers at all levels of experience. Requirements
              below reflect the minimum experience level.
            </p>
          </div>
        </div>

        <div className="text-primary/75 my-5 space-y-6">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            tempore alias dolores. Maxime id quas, asperiores dolor illo
            veritatis quibusdam sint possimus quod hic nulla officiis
            necessitatibus laudantium expedita commodi?Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Nulla, cum nostrum.
            Exercitationem, dolores, tenetur culpa quas perspiciatis, libero
            iste voluptate totam mollitia facere fugiat fugit veritatis
            accusantium quae aliquam. Labore?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            tempore alias dolores. Maxime id quas, asperiores dolor illo
            veritatis quibusdam sint possimus quod hic nulla officiis
            necessitatibus laudantium expedita commodi?Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Nulla, cum nostrum.
            Exercitationem, dolores, tenetur culpa quas perspiciatis, libero
            iste voluptate totam mollitia facere fugiat fugit veritatis
            accusantium quae aliquam. Labore?
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
            tempore alias dolores. Maxime id quas, asperiores dolor illo
            veritatis quibusdam sint possimus quod hic nulla officiis
            necessitatibus laudantium expedita commodi?Lorem ipsum, dolor sit
            amet consectetur adipisicing elit. Nulla, cum nostrum.
            Exercitationem, dolores, tenetur culpa quas perspiciatis, libero
            iste voluptate totam mollitia facere fugiat fugit veritatis
            accusantium quae aliquam. Labore?
          </p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
