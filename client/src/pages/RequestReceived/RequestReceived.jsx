import React, { useContext, useEffect, useState } from "react";
import styles from "./RequestReceived.module.css";
import AuthContext from "../../store/auth-context";
import toast from "react-hot-toast";
import { ImCross, ImCheckmark } from "react-icons/im";
import backendUrl from "../../backendUrl";
import UploadSignature from "../../components/UploadSignature/UploadSignature";

const RequestReceived = () => {
  const authCtx = useContext(AuthContext);
  const userType = authCtx.userType;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApproveLoading, setIsApproveLoading] = useState(false);
  const [purpose, setPurpose] = useState("general");
  const [signatures, setSignatures] = useState({
    faculty1: false,
    faculty2: false,
  });

  const getRequestData = async (purposeValue) => {
    setIsLoading(true);

    await fetch(`${backendUrl}/getRequestData`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + authCtx.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ purpose: purposeValue || "general" }),
    })
      .then((res) => {
        if (res.status !== 200) {
          return [];
        }
        return res.json();
      })
      .then((res) => {
        if (res == []) {
          toast.error("Failed to load Requests Received");
        }
        setData(res);
      })
      .catch((err) => toast.error(err.message));

    setIsLoading(false);
  };

  const fetchSignatures = async () => {
    try {
      const res = await fetch(`${backendUrl}/checkSignatures`, {
        headers: {
          Authorization: `Bearer ${authCtx.token}`,
        },
      });
  
      if (res.status === 401) {
        toast.error("Unauthorized. Please login again.");
        return;
      }
  
      const data = await res.json();
      setSignatures(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch signature status");
    }
  };
  

  useEffect(() => {
    getRequestData(purpose);
    fetchSignatures();
  }, [purpose]);

  const handleSignatureUpload = () => {
    fetchSignatures();
  };

  const isApproveEnabled = signatures.faculty1 && signatures.faculty2;

  return (
    <>
      {/* <Navbar /> */}
      <div style={{ paddingTop: "150px" }} className={styles.body}>
        <div className={styles["tabs-btn"]}>
          <h4>Purpose Category</h4>
          <button
            onClick={() => {
              setPurpose("general");
            }}
            className={purpose === "general" && styles["tab-active"]}
          >
            General
          </button>
          <button
            onClick={() => {
              setPurpose("event");
            }}
            className={purpose === "event" && styles["tab-active"]}
          >
            Event
          </button>
        </div>
        <div>
          <div className={styles.total}>
            <strong>Total Requests Received:</strong> {data.length}
          </div>
          {isApproveLoading && <div className={styles["loader-approve"]}></div>}
          <div style={{ overflowX: "auto" }}>
            <table>
            <tr className="table-header">
  <th className="col-sno">S. No.</th>
  <th className="col-name">Name</th>
  <th className="col-course">Course</th>
  <th className="col-roll">Roll Number</th>
  {/* <th className="col-email">Email</th> */}
  <th className="col-purpose">Purpose</th>
  <th className="col-data">Data Exist</th>
  <th className="col-approve">Approve Request</th>
  <th className="col-reject">Reject Request</th>
</tr>
              {isLoading ? (
                <td colspan={9}>
                  <div className={styles.loader}></div>
                </td>
              ) : (
                data.map((res, index) => (
                  <tr key={res._id}>
                    <td>{index + 1}</td>
                    <td>{res.name}</td>
                    <td>
                      {res.course} {res?.branch && <span>({res?.branch})</span>}
                    </td>
                    <td>{res.rollNumber}</td>
                    {/* <td>{res.email}</td> */}
                    <td>
                      {res.purpose === "general" ? (
                        <span>
                          <strong>{res.purpose.toUpperCase()}</strong>
                        </span>
                      ) : (
                        <span>
                          <strong>{res.purpose.toUpperCase()}</strong>
                          {res.event}
                        </span>
                      )}
                    </td>
                    <td>
                      {res.dataExist ? (
                        <ImCheckmark color="#38E54D" size={20} />
                      ) : (
                        <ImCross color="#DC3535" />
                      )}
                    </td>
                    <td>
                      <button
                        className={styles.button}
                        style={{ backgroundColor: "#82cd47" }}
                        disabled={!isApproveEnabled}
                        onClick={async () => {
                          setIsApproveLoading(true);
                          await fetch(
                            `${backendUrl}/approveRequest/${res._id}`,
                            {
                              headers: {
                                Authorization: "Bearer " + authCtx.token,
                              },
                              method: "POST",
                            },
                          )
                            .then((res) => res.json())
                            .then(async (resData) => {
                              if (resData.error) {
                                toast.error(resData.error);
                              } else if (resData.message) {
                                toast.success(resData.message);

                                await fetch(
                                  `${backendUrl}/deleteRequestData/` + res._id,
                                  {
                                    headers: {
                                      Authorization: "Bearer " + authCtx.token,
                                    },
                                    method: "DELETE",
                                  },
                                )
                                  .then((res) => res.json())
                                  .then((resData) => {
                                    if (resData.error) {
                                      toast.error(resData.error);
                                    } else if (resData.message) {
                                      setData(
                                        data.filter(
                                          (data) => data._id !== res._id,
                                        ),
                                      );
                                      console.log(resData.message);
                                    }
                                  })
                                  .catch((err) => console.log(err));
                              }
                            })
                            .catch((err) => console.log(err));
                          setIsApproveLoading(false);
                        }}
                      >
                        Approve
                      </button>
                    </td>
                    <td>
                      <button
                        className={styles.button}
                        style={{ backgroundColor: "#ff6464" }}
                        onClick={async () => {
                          await fetch(
                            `${backendUrl}/deleteRequestData/` + res._id,
                            {
                              headers: {
                                Authorization: "Bearer " + authCtx.token,
                              },
                              method: "DELETE",
                            },
                          )
                            .then((res) => res.json())
                            .then((resData) => {
                              if (resData.error) {
                                toast.error(resData.error);
                              } else if (resData.message) {
                                setData(
                                  data.filter((data) => data._id !== res._id),
                                );
                                toast.success(resData.message);
                              }
                            })
                            .catch((err) => console.log(err));
                        }}
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </table>
          </div>
        </div>
      </div>

      <div style={{ margin: "1rem 0", fontWeight: "bold" }}>
        Signature Status:
        <ul>
          <li>
            Dr. Pawan Kumar Tiwari: {signatures.faculty1 ? "✅ Uploaded" : "❌ Not Uploaded"}
          </li>
          <li>
            Dr. Ajay Kumar Sharma: {signatures.faculty2 ? "✅ Uploaded" : "❌ Not Uploaded"}
          </li>
        </ul>
      </div>

      {(userType === "teachers" || userType === "master") && (
        <UploadSignature onUpload={handleSignatureUpload} />
      )}

      {/* <Footer /> */}
    </>
  );
};

export default RequestReceived;
